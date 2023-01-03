import {
  BalanceChangedETH as BalanceChangedETHEvent,
  CallClosed as CallClosedEvent,
  CallOpened as CallOpenedEvent,
  CollectProtocol as CollectProtocolEvent,
  Deposit as DepositEvent,
  DepositETH as DepositETHEvent,
  OffMarket as OffMarketEvent,
  OnMarket as OnMarketEvent,
  Paused as PausedEvent,
  PremiumReceived as PremiumReceivedEvent,
  Unpaused as UnpausedEvent,
  Withdraw as WithdrawEvent,
  WithdrawETH as WithdrawETHEvent,
} from "../generated/MAYCCallPool/CallPool";
import {
  BalanceChangedETH,
  CallClosed,
  CallOpened,
  CollectProtocol,
  Deposit,
  DepositETH,
  OffMarket,
  OnMarket,
  Paused,
  PremiumReceived,
  Unpaused,
  Withdraw,
  WithdrawETH,
} from "../generated/schema";

export function handleBalanceChangedETH(event: BalanceChangedETHEvent): void {
  let entity = new BalanceChangedETH(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.user = event.params.user;
  entity.newBalance = event.params.newBalance;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleCallClosed(event: CallClosedEvent): void {
  let entity = new CallClosed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.nft = event.params.nft;
  entity.user = event.params.user;
  entity.owner = event.params.owner;
  entity.tokenId = event.params.tokenId;
  entity.price = event.params.price;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleCallOpened(event: CallOpenedEvent): void {
  let entity = new CallOpened(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.nft = event.params.nft;
  entity.user = event.params.user;
  entity.tokenId = event.params.tokenId;
  entity.strikePriceGap = event.params.strikePriceGap;
  entity.duration = event.params.duration;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleCollectProtocol(event: CollectProtocolEvent): void {
  let entity = new CollectProtocol(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.sender = event.params.sender;
  entity.recipient = event.params.recipient;
  entity.amount = event.params.amount;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleDeposit(event: DepositEvent): void {
  let entity = new Deposit(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.nft = event.params.nft;
  entity.user = event.params.user;
  entity.onBehalfOf = event.params.onBehalfOf;
  entity.tokenId = event.params.tokenId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleDepositETH(event: DepositETHEvent): void {
  let entity = new DepositETH(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.user = event.params.user;
  entity.receiver = event.params.receiver;
  entity.amount = event.params.amount;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleOffMarket(event: OffMarketEvent): void {
  let entity = new OffMarket(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.nft = event.params.nft;
  entity.owner = event.params.owner;
  entity.tokenId = event.params.tokenId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleOnMarket(event: OnMarketEvent): void {
  let entity = new OnMarket(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.nft = event.params.nft;
  entity.owner = event.params.owner;
  entity.tokenId = event.params.tokenId;

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

export function handlePremiumReceived(event: PremiumReceivedEvent): void {
  let entity = new PremiumReceived(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.nft = event.params.nft;
  entity.owner = event.params.owner;
  entity.tokenId = event.params.tokenId;
  entity.premiumToOwner = event.params.premiumToOwner;
  entity.premiumToReserve = event.params.premiumToReserve;

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

export function handleWithdraw(event: WithdrawEvent): void {
  let entity = new Withdraw(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.nft = event.params.nft;
  entity.user = event.params.user;
  entity.to = event.params.to;
  entity.tokenId = event.params.tokenId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleWithdrawETH(event: WithdrawETHEvent): void {
  let entity = new WithdrawETH(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.user = event.params.user;
  entity.to = event.params.to;
  entity.amount = event.params.amount;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
