import { BigInt } from "@graphprotocol/graph-ts";
import {
  CallClosed as CallClosedEvent,
  CallOpened as CallOpenedEvent,
  Deposit as DepositEvent,
  OffMarket as OffMarketEvent,
  OnMarket as OnMarketEvent,
  PremiumReceived as PremiumReceivedEvent,
  Withdraw as WithdrawEvent,
  WithdrawETH as WithdrawETHEvent,
  PreferenceUpdated as PreferenceUpdatedEvent,
  CallPool,
} from "../generated/BAYCCallPool/CallPool";
import { CallToken } from "../generated/BAYCCallPool/CallToken";
import { NFTOracle } from "../generated/BAYCCallPool/NFTOracle";
import { NFT, Position, NFTTransaction } from "../generated/schema";
import { getNFTId } from "./adapter/nft";
import {
  getCallPoolStats,
  setTotalDepositedNFTs,
  setTotalListedNFTs,
} from "./adapter/stat";
import { addUserAccruedEarnings } from "./adapter/userStat";

export function handleCallClosed(event: CallClosedEvent): void {
  const nftId = getNFTId(event.params.nft, event.params.tokenId);
  let nftRecord = NFT.load(nftId);
  if (!nftRecord || !nftRecord.position) return;
  const positionRecord = Position.load(nftRecord.position!);
  if (!positionRecord) return;
  positionRecord.status = "Exercised";

  const callPoolContract = CallPool.bind(event.address);
  const nftOracleAddress = callPoolContract.oracle();
  const nftOracleContract = NFTOracle.bind(nftOracleAddress);
  const floorPrice = nftOracleContract.getAssetPrice(event.params.nft);
  positionRecord.floorPrice = floorPrice;

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

  nftTransactionRecord.soldPrice = event.params.price;
  nftTransactionRecord.createTimestamp = event.block.timestamp.toI32();
  nftTransactionRecord.transactionHash = event.transaction.hash;
  nftTransactionRecord.save();

  const callPoolStatsId = nftRecord.callPoolStat;
  const callPoolStats = getCallPoolStats(callPoolStatsId);
  setTotalDepositedNFTs(callPoolStats, -1);
  setTotalListedNFTs(callPoolStats, -1);

  callPoolStats.save();

  addUserAccruedEarnings(
    positionRecord.nftOwnerAddress,
    event.address,
    event.params.price
  );
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
  positionRecord.nftOwnerAddress = nftRecord.userAddress;
  const callPoolContract = CallPool.bind(event.address);
  const callTokenAddress = callPoolContract.callToken();
  const callTokenContract = CallToken.bind(callTokenAddress);

  const callInfo = callTokenContract.getCallInfo(event.params.tokenId);
  positionRecord.exerciseTime = callInfo.exerciseTime.toI32();
  positionRecord.endTime = callInfo.endTime.toI32();
  positionRecord.strikePrice = callInfo.strikePrice;
  positionRecord.floorPrice = BigInt.fromI32(0);
  positionRecord.status = "Unexercised";
  positionRecord.updateTimestamp = event.block.timestamp.toI32();
  positionRecord.createTimestamp = event.block.timestamp.toI32();
  positionRecord.premiumToOwner = BigInt.fromI32(0);
  positionRecord.premiumToReserve = BigInt.fromI32(0);
  positionRecord.save();

  nftRecord.updateTimestamp = event.block.timestamp.toI32();
  nftRecord.status = "Called";
  nftRecord.position = positionId;
  nftRecord.positionEndTimestamp = positionRecord.endTime;
  nftRecord.save();

  const callPoolStatsId = nftRecord.callPoolStat;
  const callPoolStats = getCallPoolStats(callPoolStatsId);

  const nftOracleAddress = callPoolContract.oracle();
  const nftOracleContract = NFTOracle.bind(nftOracleAddress);
  const floorPrice = nftOracleContract.getAssetPrice(event.params.nft);
  callPoolStats.totalTradingVolume = callPoolStats.totalTradingVolume.plus(
    floorPrice
  );
  callPoolStats.save();
}

export function handleDeposit(event: DepositEvent): void {
  const nftId = getNFTId(event.params.nft, event.params.tokenId);
  let nftRecord = NFT.load(nftId);
  if (!nftRecord) {
    nftRecord = new NFT(nftId);
    nftRecord.nftAddress = event.params.nft;
    nftRecord.tokenId = event.params.tokenId;
    nftRecord.callPoolStat = event.address.toHexString();
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
  nftRecord.lowerLimitOfStrikePrice = NFTStatus.value4;

  nftRecord.userAddress = event.params.onBehalfOf;
  nftRecord.callPoolAddress = event.address;

  nftRecord.status = "Listed";
  nftRecord.updateTimestamp = event.block.timestamp.toI32();

  nftRecord.save();

  const callPoolStatsId = nftRecord.callPoolStat;
  const callPoolStats = getCallPoolStats(callPoolStatsId);
  setTotalDepositedNFTs(callPoolStats, 1);
  setTotalListedNFTs(callPoolStats, 1);

  callPoolStats.save();
}

export function handleOffMarket(event: OffMarketEvent): void {
  const nftId = getNFTId(event.params.nft, event.params.tokenId);
  let nftRecord = NFT.load(nftId);
  if (!nftRecord) return;
  nftRecord.status = "Deposited";
  nftRecord.updateTimestamp = event.block.timestamp.toI32();
  nftRecord.save();

  const callPoolStatsId = nftRecord.callPoolStat;
  const callPoolStats = getCallPoolStats(callPoolStatsId);
  setTotalListedNFTs(callPoolStats, -1);

  callPoolStats.save();
}

export function handleOnMarket(event: OnMarketEvent): void {
  const nftId = getNFTId(event.params.nft, event.params.tokenId);
  let nftRecord = NFT.load(nftId);
  if (!nftRecord) return;
  nftRecord.status = "Listed";
  nftRecord.updateTimestamp = event.block.timestamp.toI32();
  nftRecord.save();

  const callPoolStatsId = nftRecord.callPoolStat;
  const callPoolStats = getCallPoolStats(callPoolStatsId);
  setTotalListedNFTs(callPoolStats, 1);

  callPoolStats.save();
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
  const callPoolStatsId = nftRecord.callPoolStat;
  const callPoolStats = getCallPoolStats(callPoolStatsId);
  callPoolStats.accumulativePremium = callPoolStats.accumulativePremium.plus(
    positionRecord.premiumToReserve
  );
  callPoolStats.save();

  addUserAccruedEarnings(
    positionRecord.nftOwnerAddress,
    event.address,
    event.params.premiumToOwner
  );
}

export function handleWithdraw(event: WithdrawEvent): void {
  const nftId = getNFTId(event.params.nft, event.params.tokenId);
  let nftRecord = NFT.load(nftId);
  if (!nftRecord) return;
  const status = nftRecord.status;
  nftRecord.status = "Removed";
  nftRecord.updateTimestamp = event.block.timestamp.toI32();
  nftRecord.save();

  const callPoolStatsId = nftRecord.callPoolStat;
  const callPoolStats = getCallPoolStats(callPoolStatsId);
  setTotalDepositedNFTs(callPoolStats, -1);
  if (status == "Listed" || status == "Called") {
    setTotalListedNFTs(callPoolStats, -1);
  }
  callPoolStats.save();
}

export function handleWithdrawETH(event: WithdrawETHEvent): void {}

export function handlePreferenceUpdated(event: PreferenceUpdatedEvent): void {
  const nftId = getNFTId(event.params.nft, event.params.tokenId);
  let nftRecord = NFT.load(nftId);
  if (!nftRecord) return;
  nftRecord.strikePriceGapIdx = event.params.lowerStrikePriceGapIdx;
  nftRecord.durationIdx = event.params.upperDurationIdx;
  nftRecord.lowerLimitOfStrikePrice = event.params.lowerLimitOfStrikePrice;
  nftRecord.updateTimestamp = event.block.timestamp.toI32();
  nftRecord.save();
}
