import {
  ActivateMarket as ActivateMarketEvent,
  CreateMarket as CreateMarketEvent,
  CreateStrike as CreateStrikeEvent,
  DeactivateMarket as DeactivateMarketEvent,
  DefreezeMarket as DefreezeMarketEvent,
  DestoryStrike as DestoryStrikeEvent,
  FreezeMarket as FreezeMarketEvent,
  KeeperAddressUpdated as KeeperAddressUpdatedEvent,
  PauseVault as PauseVaultEvent,
  Paused as PausedEvent,
  ReceiveKeeperFee as ReceiveKeeperFeeEvent,
  ReceivePremium as ReceivePremiumEvent,
  SendRevenue as SendRevenueEvent,
  UnpauseVault as UnpauseVaultEvent,
  Unpaused as UnpausedEvent,
  UpdateLPTokenPrice as UpdateLPTokenPriceEvent,
} from "../generated/Vault/Vault";
import {
  CreateMarket,
  CreateStrike,
  DestoryStrike,
  OptionStrike,
  Paused,
  ReceivePremium,
  SendRevenue,
  Unpaused,
  ActivateMarket,
  DeactivateMarket,
  DefreezeMarket,
  FreezeMarket,
  KeeperAddressUpdated,
  PauseVault,
  ReceiveKeeperFee,
  UnpauseVault,
  UpdateLPTokenPrice,
} from "../generated/schema";

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
  entity.spotPrice = event.params.spotPrice;
  entity.strikePrice = event.params.strikePrice;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  let strikeEntity = new OptionStrike(event.params.strikeId.toHexString());

  strikeEntity.createTimestamp = event.block.timestamp.toI32();
  strikeEntity.updateTimestamp = event.block.timestamp.toI32();

  strikeEntity.duration = event.params.duration;
  strikeEntity.expiration = event.params.expiration;
  strikeEntity.spotPrice = event.params.spotPrice;
  strikeEntity.strikePrice = event.params.strikePrice;
  strikeEntity.enabled = true;

  strikeEntity.save();
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

  let strikeEntity = OptionStrike.load(event.params.strikeId.toHexString());
  if (strikeEntity) {
    strikeEntity.enabled = false;
    strikeEntity.updateTimestamp = event.block.timestamp.toI32();
    strikeEntity.save();
  }
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

export function handleReceivePremium(event: ReceivePremiumEvent): void {
  let entity = new ReceivePremium(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.user = event.params.user;
  entity.amountToReserve = event.params.amountToReserve;
  entity.amountToLiquidityPool = event.params.amountToLiquidityPool;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleSendRevenue(event: SendRevenueEvent): void {
  let entity = new SendRevenue(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.receiver = event.params.receiver;
  entity.amount = event.params.amount;
  entity.fee = event.params.fee;

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

export function handleReceiveKeeperFee(event: ReceiveKeeperFeeEvent): void {
  let entity = new ReceiveKeeperFee(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.user = event.params.user;
  entity.amount = event.params.amount;

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
