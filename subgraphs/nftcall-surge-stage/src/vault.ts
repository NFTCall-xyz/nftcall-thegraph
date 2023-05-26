import {
  CreateMarket as CreateMarketEvent,
  CreateStrike as CreateStrikeEvent,
  DestoryStrike as DestoryStrikeEvent,
  OpenPosition as OpenPositionEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Paused as PausedEvent,
  ReceivePremium as ReceivePremiumEvent,
  SendRevenue as SendRevenueEvent,
  Unpaused as UnpausedEvent,
} from "../generated/Vault/Vault";
import {
  CreateMarket,
  CreateStrike,
  DestoryStrike,
  OpenPosition,
  OwnershipTransferred,
  Paused,
  ReceivePremium,
  SendRevenue,
  Unpaused,
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

export function handleOpenPosition(event: OpenPositionEvent): void {
  let entity = new OpenPosition(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.collection = event.params.collection;
  entity.strikeId = event.params.strikeId;
  entity.positionId = event.params.positionId;
  entity.estimatedPremium = event.params.estimatedPremium;

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
