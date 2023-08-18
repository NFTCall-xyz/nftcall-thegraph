import { BigInt } from "@graphprotocol/graph-ts";
import {
  ActivateMarket as ActivateMarketEvent,
  ActivatePosition as ActivatePositionEvent,
  CancelPosition as CancelPositionEvent,
  CreateMarket as CreateMarketEvent,
  CreateStrike as CreateStrikeEvent,
  DeactivateMarket as DeactivateMarketEvent,
  DefreezeMarket as DefreezeMarketEvent,
  DestoryStrike as DestoryStrikeEvent,
  ExercisePosition as ExercisePositionEvent,
  ExpirePosition as ExpirePositionEvent,
  FailPosition as FailPositionEvent,
  FreezeMarket as FreezeMarketEvent,
  KeeperAddressUpdated as KeeperAddressUpdatedEvent,
  OpenPosition as OpenPositionEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  PauseVault as PauseVaultEvent,
  Paused as PausedEvent,
  UnpauseVault as UnpauseVaultEvent,
  Unpaused as UnpausedEvent,
  UpdateLPTokenPrice as UpdateLPTokenPriceEvent,
} from "../generated/Vault/Vault";
import {
  ActivateMarket,
  ActivatePosition,
  CancelPosition,
  CreateMarket,
  CreateStrike,
  DeactivateMarket,
  DefreezeMarket,
  DestoryStrike,
  ExercisePosition,
  ExpirePosition,
  FailPosition,
  FreezeMarket,
  KeeperAddressUpdated,
  OpenPosition,
  OptionPosition,
  OwnershipTransferred,
  PauseVault,
  Paused,
  UnpauseVault,
  Unpaused,
  UpdateLPTokenPrice,
  Vault,
  Trader,
} from "../generated/schema";
import { getOptionPositionId } from "./adapter/option-position";
import { getTraderEntity } from "./adapter/trader";

export function handleActivateMarket(event: ActivateMarketEvent): void {
  let entity = new ActivateMarket(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.operator = event.params.operator;
  entity.collection = event.params.collection;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleCreateMarket(event: CreateMarketEvent): void {
  let entity = new CreateMarket(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.collection = event.params.collection;
  entity.weight = event.params.weight;
  entity.optionToken = event.params.optionToken;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleCreateStrike(event: CreateStrikeEvent): void {
  let entity = new CreateStrike(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.strikeId = event.params.strikeId;
  entity.duration = event.params.duration;
  entity.expiration = event.params.expiration;
  entity.entryPrice = event.params.entryPrice;
  entity.strikePrice = event.params.strikePrice;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleDeactivateMarket(event: DeactivateMarketEvent): void {
  let entity = new DeactivateMarket(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.operator = event.params.operator;
  entity.collection = event.params.collection;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleDefreezeMarket(event: DefreezeMarketEvent): void {
  let entity = new DefreezeMarket(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.operator = event.params.operator;
  entity.collection = event.params.collection;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleDestoryStrike(event: DestoryStrikeEvent): void {
  let entity = new DestoryStrike(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.strikeId = event.params.strikeId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleFreezeMarket(event: FreezeMarketEvent): void {
  let entity = new FreezeMarket(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.operator = event.params.operator;
  entity.collection = event.params.collection;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleKeeperAddressUpdated(
  event: KeeperAddressUpdatedEvent
): void {
  let entity = new KeeperAddressUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.keeperAddress = event.params.keeperAddress;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.previousOwner = event.params.previousOwner;
  entity.newOwner = event.params.newOwner;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handlePauseVault(event: PauseVaultEvent): void {
  let entity = new PauseVault(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.operator = event.params.operator;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handlePaused(event: PausedEvent): void {
  let entity = new Paused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.account = event.params.account;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleUnpauseVault(event: UnpauseVaultEvent): void {
  let entity = new UnpauseVault(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.operator = event.params.operator;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleUnpaused(event: UnpausedEvent): void {
  let entity = new Unpaused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.account = event.params.account;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleUpdateLPTokenPrice(event: UpdateLPTokenPriceEvent): void {
  let entity = new UpdateLPTokenPrice(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.lpToken = event.params.lpToken;
  entity.newPrice = event.params.newPrice;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleOpenPosition(event: OpenPositionEvent): void {
  let entity = new OpenPosition(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.caller = event.params.caller;
  entity.receiver = event.params.receiver;
  entity.collection = event.params.collection;
  entity.positionId = event.params.positionId;
  entity.parameters_optionType = event.params.parameters.optionType;
  entity.parameters_expiration = event.params.parameters.expiration;
  entity.parameters_entryPrice = event.params.parameters.entryPrice;
  entity.parameters_strikePrice = event.params.parameters.strikePrice;
  entity.parameters_amount = event.params.parameters.amount;
  entity.parameters_premium = event.params.parameters.premium;
  entity.parameters_keeperFee = event.params.parameters.keeperFee;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  let positionEntity = new OptionPosition(
    getOptionPositionId(event.params.collection, event.params.positionId)
  );

  positionEntity.status = "Pending";
  positionEntity.positionId = event.params.positionId;
  positionEntity.collectionAddress = event.params.collection;
  positionEntity.callerAddress = event.params.caller;
  positionEntity.receiverAddress = event.params.receiver;

  positionEntity.premium = event.params.parameters.premium;
  positionEntity.amount = event.params.parameters.amount;
  positionEntity.optionType = event.params.parameters.optionType;
  positionEntity.expiration = event.params.parameters.expiration;
  positionEntity.strikePrice = event.params.parameters.strikePrice;
  positionEntity.entryPrice = event.params.parameters.entryPrice;
  positionEntity.keeperFee = event.params.parameters.keeperFee;

  positionEntity.excessPremium = BigInt.fromI32(0);
  positionEntity.returnedPremium = BigInt.fromI32(0);
  positionEntity.revenue = BigInt.fromI32(0);
  positionEntity.exerciseFee = BigInt.fromI32(0);
  positionEntity.delta = BigInt.fromI32(0);
  positionEntity.settlementPrice = BigInt.fromI32(0);

  positionEntity.createTimestamp = event.block.timestamp.toI32();
  positionEntity.updateTimestamp = event.block.timestamp.toI32();

  positionEntity.save();
}

export function handleActivatePosition(event: ActivatePositionEvent): void {
  let entity = new ActivatePosition(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.owner = event.params.owner;
  entity.collection = event.params.collection;
  entity.positionId = event.params.positionId;
  entity.premium = event.params.premium;
  entity.excessPremium = event.params.excessPremium;
  entity.delta = event.params.delta;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  let positionEntity = OptionPosition.load(
    getOptionPositionId(event.params.collection, event.params.positionId)
  );
  if (!positionEntity) return;

  positionEntity.status = "Active";
  positionEntity.premium = event.params.premium;
  positionEntity.delta = event.params.delta;
  positionEntity.excessPremium = event.params.excessPremium;

  positionEntity.updateTimestamp = event.block.timestamp.toI32();
  positionEntity.save();

  let vaultEntity = Vault.load("1");
  if (vaultEntity == null) {
    vaultEntity = new Vault("1");
    vaultEntity.totalTradingVolume = BigInt.fromI32(0);
    vaultEntity.totalPremiumCollected = BigInt.fromI32(0);
    vaultEntity.totalTrades = 0;
    vaultEntity.totalTraders = 0;
    vaultEntity.createTimestamp = event.block.timestamp.toI32();
  }

  const tradingVolume = positionEntity.entryPrice.times(positionEntity.amount);
  vaultEntity.totalTradingVolume = vaultEntity.totalTradingVolume.plus(
    tradingVolume
  );
  vaultEntity.totalPremiumCollected = vaultEntity.totalPremiumCollected.plus(
    event.params.premium
  );
  vaultEntity.totalTrades = vaultEntity.totalTrades + 1;
  vaultEntity.updateTimestamp = event.block.timestamp.toI32();

  const traderAddress = positionEntity.receiverAddress;
  const noTrader = Trader.load(traderAddress.toHexString()) == null;
  if (noTrader) vaultEntity.totalTraders = vaultEntity.totalTraders + 1;

  vaultEntity.save();

  const traderEntity = getTraderEntity(
    traderAddress,
    event.block.timestamp.toI32()
  );

  traderEntity.totalVolume = traderEntity.totalVolume.plus(tradingVolume);
  const totalPremium = traderEntity.totalPremium.plus(event.params.premium);
  traderEntity.totalPremium = totalPremium;
  traderEntity.PNL = traderEntity.totalRevenue.minus(totalPremium);
  traderEntity.totalTrades = traderEntity.totalTrades + 1;
  traderEntity.updateTimestamp = event.block.timestamp.toI32();
  traderEntity.save();
}

export function handleCancelPosition(event: CancelPositionEvent): void {
  let entity = new CancelPosition(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.owner = event.params.owner;
  entity.collection = event.params.collection;
  entity.positionId = event.params.positionId;
  entity.returnedPremium = event.params.returnedPremium;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  let positionEntity = OptionPosition.load(
    getOptionPositionId(event.params.collection, event.params.positionId)
  );
  if (!positionEntity) return;

  positionEntity.status = "Cancelled";
  positionEntity.returnedPremium = event.params.returnedPremium;

  positionEntity.updateTimestamp = event.block.timestamp.toI32();
  positionEntity.save();
}

export function handleExercisePosition(event: ExercisePositionEvent): void {
  let entity = new ExercisePosition(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.owner = event.params.owner;
  entity.collection = event.params.collection;
  entity.positionId = event.params.positionId;
  entity.revenue = event.params.revenue;
  entity.exerciseFee = event.params.exerciseFee;
  entity.settlementPrice = event.params.settlementPrice;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  let positionEntity = OptionPosition.load(
    getOptionPositionId(event.params.collection, event.params.positionId)
  );
  if (!positionEntity) return;

  positionEntity.status = "Exercised";
  positionEntity.revenue = event.params.revenue;
  positionEntity.exerciseFee = event.params.exerciseFee;
  positionEntity.settlementPrice = event.params.settlementPrice;

  positionEntity.updateTimestamp = event.block.timestamp.toI32();
  positionEntity.save();

  let traderEntity = Trader.load(positionEntity.receiverAddress.toHexString());
  if (traderEntity) {
    const totalRevenue = traderEntity.totalRevenue.plus(event.params.revenue);
    traderEntity.totalRevenue = totalRevenue;
    traderEntity.PNL = totalRevenue.minus(traderEntity.totalPremium);
    traderEntity.totalExercisedOptionPosition =
      traderEntity.totalExercisedOptionPosition + 1;
    traderEntity.updateTimestamp = event.block.timestamp.toI32();
    traderEntity.save();
  }
}

export function handleExpirePosition(event: ExpirePositionEvent): void {
  let entity = new ExpirePosition(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.owner = event.params.owner;
  entity.collection = event.params.collection;
  entity.positionId = event.params.positionId;
  entity.settlementPrice = event.params.settlementPrice;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  let positionEntity = OptionPosition.load(
    getOptionPositionId(event.params.collection, event.params.positionId)
  );
  if (!positionEntity) return;

  positionEntity.status = "Expired";
  positionEntity.settlementPrice = event.params.settlementPrice;

  positionEntity.updateTimestamp = event.block.timestamp.toI32();
  positionEntity.save();
}

export function handleFailPosition(event: FailPositionEvent): void {
  let entity = new FailPosition(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.owner = event.params.owner;
  entity.collection = event.params.collection;
  entity.positionId = event.params.positionId;
  entity.returnedPremium = event.params.returnedPremium;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  let positionEntity = OptionPosition.load(
    getOptionPositionId(event.params.collection, event.params.positionId)
  );
  if (!positionEntity) return;

  positionEntity.status = "Failed";
  positionEntity.returnedPremium = event.params.returnedPremium;

  positionEntity.updateTimestamp = event.block.timestamp.toI32();
  positionEntity.save();
}
