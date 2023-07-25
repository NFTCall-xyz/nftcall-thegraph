import {
  Deposit as DepositEvent,
  Withdraw as WithdrawEvent,
} from "../generated/LPToken/LPToken";
import { BigInt } from "@graphprotocol/graph-ts";
import { getTraderEntity } from "./adapter/trader";

export function handleDeposit(event: DepositEvent): void {
  const traderEntity = getTraderEntity(
    event.params.sender,
    event.block.timestamp.toI32()
  );

  traderEntity.depositAmount = traderEntity.depositAmount.plus(
    event.params.assets
  );

  traderEntity.save();
}

export function handleWithdraw(event: WithdrawEvent): void {
  const traderEntity = getTraderEntity(
    event.params.owner,
    event.block.timestamp.toI32()
  );

  traderEntity.depositAmount = traderEntity.depositAmount.minus(
    event.params.assets
  );

  if (traderEntity.depositAmount.lt(BigInt.fromI32(0))) {
    traderEntity.depositAmount = BigInt.fromI32(0);
  }

  traderEntity.save();
}
