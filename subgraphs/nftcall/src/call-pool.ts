import { BigInt, ByteArray, Bytes, crypto } from "@graphprotocol/graph-ts";
import {
  CallClosed as CallClosedEvent,
  CallOpened as CallOpenedEvent,
  Deposit as DepositEvent,
  OffMarket as OffMarketEvent,
  OnMarket as OnMarketEvent,
  PremiumReceived as PremiumReceivedEvent,
  Withdraw as WithdrawEvent,
  WithdrawETH as WithdrawETHEvent,
  CallPool,
} from "../generated/BAYCCallPool/CallPool";
import { CallToken } from "../generated/BAYCCallPool/CallToken";
import { NFT, Position, NFTTransaction } from "../generated/schema";

function getNFTId(nftAddress: Bytes, tokenId: BigInt): string {
  const nft = nftAddress.toHexString();
  const id = tokenId.toHexString();
  return crypto.keccak256(ByteArray.fromUTF8(nft + id)).toHexString();
}

export function handleCallClosed(event: CallClosedEvent): void {
  const nftId = getNFTId(event.params.nft, event.params.tokenId);
  let nftRecord = NFT.load(nftId);
  if (!nftRecord || !nftRecord.position) return;
  const positionRecord = Position.load(nftRecord.position!);
  if (!positionRecord) return;
  positionRecord.status = "Exercised";
  positionRecord.updateTimestamp = event.block.timestamp.toI32();
  positionRecord.save();

  nftRecord.status = "Removed";
  nftRecord.position = null;
  nftRecord.updateTimestamp = event.block.timestamp.toI32();
  nftRecord.save();

  const nftTransactionRecord = new NFTTransaction(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  nftTransactionRecord.userAddress = nftRecord.userAddress;
  nftTransactionRecord.nftAddress = nftRecord.nftAddress;
  nftTransactionRecord.tokenId = nftRecord.tokenId;

  nftTransactionRecord.soldPrice = positionRecord.strikePrice;
  nftTransactionRecord.createTimestamp = event.block.timestamp.toI32();
  nftTransactionRecord.transactionHash = event.transaction.hash;
  nftTransactionRecord.save()
}

export function handleCallOpened(event: CallOpenedEvent): void {
  const nftId = getNFTId(event.params.nft, event.params.tokenId);
  let nftRecord = NFT.load(nftId);
  if (!nftRecord) return;
  const positionId = event.transaction.hash
    .concatI32(event.logIndex.toI32())
    .toHexString();
  const positionRecord = new Position(positionId);
  positionRecord.userAddress = event.params.user;
  positionRecord.nftAddress = event.params.nft;
  positionRecord.tokenId = event.params.tokenId;
  positionRecord.callPoolAddress = event.address;
  const callPoolContract = CallPool.bind(event.address);
  const callTokenAddress = callPoolContract.callToken();
  const callTokenContract = CallToken.bind(callTokenAddress);

  const callInfo = callTokenContract.getCallInfo(event.params.tokenId);
  positionRecord.exerciseTime = callInfo.exerciseTime.toI32();
  positionRecord.endTime = callInfo.endTime.toI32();
  positionRecord.strikePrice = callInfo.strikePrice;
  positionRecord.status = "Unexercised";
  positionRecord.updateTimestamp = event.block.timestamp.toI32();
  positionRecord.createTimestamp = event.block.timestamp.toI32();
  positionRecord.premiumToOwner = BigInt.fromI32(0);
  positionRecord.premiumToReserve = BigInt.fromI32(0);
  positionRecord.save();

  nftRecord.updateTimestamp = event.block.timestamp.toI32();
  nftRecord.status = "Called";
  nftRecord.position = positionId;
  nftRecord.save();
}

export function handleDeposit(event: DepositEvent): void {
  const nftId = getNFTId(event.params.nft, event.params.tokenId);
  let nftRecord = NFT.load(nftId);
  if (!nftRecord) {
    nftRecord = new NFT(nftId);
    nftRecord.nftAddress = event.params.nft;
    nftRecord.tokenId = event.params.tokenId;
  }

  const callPoolContract = CallPool.bind(event.address);
  /**
   * struct NFTStatus {
      bool ifOnMarket;            // If it can be listed on market, default TRUE. Only can be set up by NFT holder
      bool available;             // If it is available for opening a position. Only when callId=0 or the option with callId has expired
      uint8 lowerStrikePriceGapIdx;   // value 0-5. If 1, means the strike price gap must be >= 10%. Default 1.
      uint8 upperDurationIdx;         // value 0-3. If 3, means the duration preference is <= 28d. Default is 3.
      uint256 lowerLimitOfStrikePrice;
    }
   */
  const NFTStatus = callPoolContract.getNFTStatus(nftRecord.tokenId);

  nftRecord.strikePriceGapIdx = NFTStatus.value2;
  nftRecord.durationIdx = NFTStatus.value3;

  nftRecord.userAddress = event.params.onBehalfOf;
  nftRecord.callPoolAddress = event.address;

  nftRecord.status = "Listed";
  nftRecord.updateTimestamp = event.block.timestamp.toI32();

  nftRecord.save();
}

export function handleOffMarket(event: OffMarketEvent): void {
  const nftId = getNFTId(event.params.nft, event.params.tokenId);
  let nftRecord = NFT.load(nftId);
  if (!nftRecord) return;
  nftRecord.status = "Deposited";
  nftRecord.updateTimestamp = event.block.timestamp.toI32();
  nftRecord.save();
}

export function handleOnMarket(event: OnMarketEvent): void {
  const nftId = getNFTId(event.params.nft, event.params.tokenId);
  let nftRecord = NFT.load(nftId);
  if (!nftRecord) return;
  nftRecord.status = "Listed";
  nftRecord.updateTimestamp = event.block.timestamp.toI32();
  nftRecord.save();
}

export function handlePremiumReceived(event: PremiumReceivedEvent): void {
  const nftId = getNFTId(event.params.nft, event.params.tokenId);
  let nftRecord = NFT.load(nftId);
  if (!nftRecord || !nftRecord.position) return;
  const positionRecord = Position.load(nftRecord.position!);
  if (!positionRecord) return;
  positionRecord.premiumToOwner = event.params.premiumToOwner;
  positionRecord.premiumToReserve = event.params.premiumToReserve;
  positionRecord.save();
}

export function handleWithdraw(event: WithdrawEvent): void {
  const nftId = getNFTId(event.params.nft, event.params.tokenId);
  let nftRecord = NFT.load(nftId);
  if (!nftRecord) return;
  nftRecord.status = "Removed";
  nftRecord.updateTimestamp = event.block.timestamp.toI32();
  nftRecord.save();
}

export function handleWithdrawETH(event: WithdrawETHEvent): void {
  // let entity = new WithdrawETH(
  //   event.transaction.hash.concatI32(event.logIndex.toI32())
  // );
  // entity.user = event.params.user;
  // entity.to = event.params.to;
  // entity.amount = event.params.amount;
  // entity.blockNumber = event.block.number;
  // entity.blockTimestamp = event.block.timestamp;
  // entity.transactionHash = event.transaction.hash;
  // entity.save();
}
