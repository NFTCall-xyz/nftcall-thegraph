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
  PreferenceUpdated as PreferenceUpdatedEvent,
  CallPool,
} from "../generated/BAYCCallPool/CallPool";
import { CallToken } from "../generated/BAYCCallPool/CallToken";
import { NFTOracle } from "../generated/BAYCCallPool/NFTOracle";
import {
  NFT,
  Position,
  NFTTransaction,
  UserStat,
  UserCallPoolStat,
  CallPoolStat,
} from "../generated/schema";

function getNFTId(nftAddress: Bytes, tokenId: BigInt): string {
  const nft = nftAddress.toHexString();
  const id = tokenId.toHexString();
  return crypto.keccak256(ByteArray.fromUTF8(nft + id)).toHexString();
}
function getUserCallPoolStatId(
  userAddress: Bytes,
  callPoolAddress: Bytes
): string {
  const user = userAddress.toHexString();
  const callPool = callPoolAddress.toHexString();
  return crypto.keccak256(ByteArray.fromUTF8(user + callPool)).toHexString();
}
function userStatHasUserCallPoolStatId(userStat: UserStat, id: string): i32 {
  for (let i = 0; i < userStat.userCallPoolStat.length; i++) {
    if (userStat.userCallPoolStat[i] == id) return i;
  }
  return -1;
}
function userStatPushUserCallPoolStatId(userStat: UserStat, id: string): void {
  const array = userStat.userCallPoolStat;
  array.push(id);
  userStat.userCallPoolStat = array;
}

// function userStatRemoveCallPoolStatId(userStat: UserStat, id: string): void {
//   const array = new Array<string>(0);
//   for (let i = 0; i < userStat.userCallPoolStat.length; i++) {
//     if (userStat.userCallPoolStat[i] == id) continue;
//     array.push(userStat.userCallPoolStat[i]);
//   }
//   userStat.userCallPoolStat = array;
// }

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
  nftTransactionRecord.save();

  const userCallPoolStatId = getUserCallPoolStatId(
    nftRecord.userAddress,
    event.address
  );
  let userCallPoolStatRecord = UserCallPoolStat.load(userCallPoolStatId);
  if (!userCallPoolStatRecord) {
    userCallPoolStatRecord = new UserCallPoolStat(userCallPoolStatId);
    userCallPoolStatRecord.userAddress = nftRecord.userAddress;
    userCallPoolStatRecord.callPoolAddress = event.address;
    userCallPoolStatRecord.accruedEarnings = BigInt.fromI32(0);
  }
  userCallPoolStatRecord.save();

  const userStatsId = nftRecord.userAddress.toHexString();
  let userStatsRecord = UserStat.load(userStatsId);
  if (!userStatsRecord) {
    userStatsRecord = new UserStat(userStatsId);
    userStatsRecord.accumulativeEarnings = BigInt.fromI32(0);
    userStatsRecord.userCallPoolStat = new Array(0);
    userStatPushUserCallPoolStatId(userStatsRecord, userCallPoolStatId);
  } else {
    if (
      userStatHasUserCallPoolStatId(userStatsRecord, userCallPoolStatId) === -1
    ) {
      userStatPushUserCallPoolStatId(userStatsRecord, userCallPoolStatId);
    }
  }
  userStatsRecord.save();

  const callPoolStatsId = nftRecord.callPoolStat;
  let callPoolStats = CallPoolStat.load(callPoolStatsId);
  if (!callPoolStats) {
    callPoolStats = new CallPoolStat(callPoolStatsId);
    callPoolStats.accumulativePremium = BigInt.fromI32(0);
    callPoolStats.totalTradingVolume = BigInt.fromI32(0);
    callPoolStats.totalDepositedNFTs = 0;
    callPoolStats.totalOptionContracts = 0;
  }
  callPoolStats.totalDepositedNFTs = callPoolStats.totalDepositedNFTs - 1;
  if (callPoolStats.totalDepositedNFTs < 0) {
    callPoolStats.totalDepositedNFTs = 0;
  }

  callPoolStats.save();
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
  let callPoolStats = CallPoolStat.load(callPoolStatsId);
  if (!callPoolStats) {
    callPoolStats = new CallPoolStat(callPoolStatsId);
    callPoolStats.accumulativePremium = BigInt.fromI32(0);
    callPoolStats.totalTradingVolume = BigInt.fromI32(0);
    callPoolStats.totalDepositedNFTs = 0;
    callPoolStats.totalOptionContracts = 0;
  }

  callPoolStats.totalOptionContracts = callPoolStats.totalOptionContracts + 1;
  const nftOracleAddress = callPoolContract.oracle();
  const nftOracleContract = NFTOracle.bind(nftOracleAddress);
  const floorPrice = nftOracleContract.getAssetPrice(event.params.nft);
  callPoolStats.totalTradingVolume = callPoolStats.totalTradingVolume.plus(
    floorPrice
  );
  callPoolStats.accumulativePremium = callPoolStats.accumulativePremium.plus(
    positionRecord.premiumToReserve
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
  let callPoolStats = CallPoolStat.load(callPoolStatsId);
  if (!callPoolStats) {
    callPoolStats = new CallPoolStat(callPoolStatsId);
    callPoolStats.accumulativePremium = BigInt.fromI32(0);
    callPoolStats.totalTradingVolume = BigInt.fromI32(0);
    callPoolStats.totalDepositedNFTs = 0;
    callPoolStats.totalOptionContracts = 0;
  }
  callPoolStats.totalDepositedNFTs = callPoolStats.totalDepositedNFTs + 1;

  callPoolStats.save();
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

  const callPoolStatsId = nftRecord.callPoolStat;
  let callPoolStats = CallPoolStat.load(callPoolStatsId);
  if (!callPoolStats) {
    callPoolStats = new CallPoolStat(callPoolStatsId);
    callPoolStats.accumulativePremium = BigInt.fromI32(0);
    callPoolStats.totalTradingVolume = BigInt.fromI32(0);
    callPoolStats.totalDepositedNFTs = 0;
    callPoolStats.totalOptionContracts = 0;
  }
  callPoolStats.totalDepositedNFTs = callPoolStats.totalDepositedNFTs - 1;
  if (callPoolStats.totalDepositedNFTs < 0) {
    callPoolStats.totalDepositedNFTs = 0;
  }
  callPoolStats.save();
}

export function handleWithdrawETH(event: WithdrawETHEvent): void {
  const userCallPoolStatId = getUserCallPoolStatId(
    event.params.to,
    event.address
  );
  let userCallPoolStatRecord = UserCallPoolStat.load(userCallPoolStatId);
  if (!userCallPoolStatRecord) {
    userCallPoolStatRecord = new UserCallPoolStat(userCallPoolStatId);
    userCallPoolStatRecord.userAddress = event.params.to;
    userCallPoolStatRecord.callPoolAddress = event.address;
    userCallPoolStatRecord.accruedEarnings = BigInt.fromI32(0);
  }

  userCallPoolStatRecord.accruedEarnings = userCallPoolStatRecord.accruedEarnings.plus(
    event.params.amount
  );
  userCallPoolStatRecord.save();

  const userStatsId = event.params.to.toHexString();
  let userStatsRecord = UserStat.load(userStatsId);
  if (!userStatsRecord) {
    userStatsRecord = new UserStat(userStatsId);
    userStatsRecord.accumulativeEarnings = BigInt.fromI32(0);
    userStatsRecord.userCallPoolStat = new Array(0);
    userStatPushUserCallPoolStatId(userStatsRecord, userCallPoolStatId);
  } else {
    if (
      userStatHasUserCallPoolStatId(userStatsRecord, userCallPoolStatId) === -1
    ) {
      userStatPushUserCallPoolStatId(userStatsRecord, userCallPoolStatId);
    }
  }
  userStatsRecord.accumulativeEarnings = userStatsRecord.accumulativeEarnings.plus(
    event.params.amount
  );
  userStatsRecord.save();
}

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
