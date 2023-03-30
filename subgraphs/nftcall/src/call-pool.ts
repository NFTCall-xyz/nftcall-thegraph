import { BigInt } from "@graphprotocol/graph-ts";
import {
  BalanceChangedETH as BalanceChangedETHEvent,
  Activate as ActivateEvent,
  CallClosed as CallClosedEvent,
  CallOpened as CallOpenedEvent,
  Deposit as DepositEvent,
  OffMarket as OffMarketEvent,
  OnMarket as OnMarketEvent,
  PremiumReceived as PremiumReceivedEvent,
  Withdraw as WithdrawEvent,
  WithdrawETH as WithdrawETHEvent,
  PreferenceUpdated as PreferenceUpdatedEvent,
  CollectProtocol as CollectProtocolEvent,
  Deactivate as DeactivateEvent,
  Paused as PausedEvent,
  Unpaused as UnpausedEvent,
  CallPool,
} from "../generated/BAYCCallPool/CallPool";
import { NFTOracle } from "../generated/BAYCCallPool/NFTOracle";
import { NFT, Position, NFTTransaction } from "../generated/schema";
import { getNFTId } from "./adapter/nft";
import {
  getCallPoolStats,
  setTotalDepositedNFTs,
  setTotalListedNFTs,
} from "./adapter/stat";
import {
  addUserAccruedEarnings,
  addUserSellerAPY,
  decreaseUserSellerTotalDuration,
} from "./adapter/userStat";

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

  const callInfo = callPoolContract.getNFTStatus(event.params.tokenId);
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
  const NFTStatus = callPoolContract.getNFTStatus(nftRecord.tokenId);

  nftRecord.strikePriceGapIdx = NFTStatus.minimumStrikeGapIdx;
  nftRecord.durationIdx = NFTStatus.maximumDurationIdx;
  nftRecord.minimumStrikePrice = NFTStatus.minimumStrikePrice;

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

  const premium = event.params.premiumToReserve.plus(
    event.params.premiumToOwner
  );
  callPoolStats.accumulativePremium = callPoolStats.accumulativePremium.plus(
    premium
  );
  callPoolStats.save();

  addUserAccruedEarnings(
    positionRecord.nftOwnerAddress,
    event.address,
    event.params.premiumToOwner
  );

  const callPoolContract = CallPool.bind(event.address);
  const nftOracleAddress = callPoolContract.oracle();
  const nftOracleContract = NFTOracle.bind(nftOracleAddress);
  const floorPrice = nftOracleContract.getAssetPrice(event.params.nft);
  addUserSellerAPY(
    positionRecord.nftOwnerAddress,
    event.address,
    premium,
    floorPrice,
    BigInt.fromI32(positionRecord.endTime - event.block.timestamp.toI32())
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
  nftRecord.minimumStrikePrice = event.params.minimumStrikePrice;
  nftRecord.updateTimestamp = event.block.timestamp.toI32();
  nftRecord.save();
}

export function handleBalanceChangedETH(event: BalanceChangedETHEvent): void {}

export function handleCollectProtocol(event: CollectProtocolEvent): void {}

export function handleActivate(event: ActivateEvent): void {
  const callPoolStatsId = event.address.toHexString();
  const callPoolStats = getCallPoolStats(callPoolStatsId);
  callPoolStats.deactivate = false;
  callPoolStats.save();
}
export function handleDeactivate(event: DeactivateEvent): void {
  const callPoolStatsId = event.address.toHexString();
  const callPoolStats = getCallPoolStats(callPoolStatsId);
  callPoolStats.deactivate = true;
  callPoolStats.save();
}

export function handlePaused(event: PausedEvent): void {
  const callPoolStatsId = event.address.toHexString();
  const callPoolStats = getCallPoolStats(callPoolStatsId);
  callPoolStats.paused = true;
  callPoolStats.save();
}
export function handleUnpaused(event: UnpausedEvent): void {
  const callPoolStatsId = event.address.toHexString();
  const callPoolStats = getCallPoolStats(callPoolStatsId);
  callPoolStats.paused = false;
  callPoolStats.save();
}
