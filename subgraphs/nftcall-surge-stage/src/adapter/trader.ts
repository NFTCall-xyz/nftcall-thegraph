import { Bytes, BigInt } from "@graphprotocol/graph-ts";
import { Trader } from "../../generated/schema";

export function getTraderEntity(
  traderAddress: Bytes,
  createTimestamp: i32
): Trader {
  let traderEntity = Trader.load(traderAddress.toHexString());
  if (traderEntity == null) {
    traderEntity = new Trader(traderAddress.toHexString());
    traderEntity.PNL = BigInt.fromI32(0);
    traderEntity.totalRevenue = BigInt.fromI32(0);
    traderEntity.depositAmount = BigInt.fromI32(0);
    traderEntity.totalVolume = BigInt.fromI32(0);
    traderEntity.totalPremium = BigInt.fromI32(0);
    traderEntity.totalTrades = 0;
    traderEntity.totalExercisedOptionPosition = 0;
    traderEntity.createTimestamp = createTimestamp;
    traderEntity.updateTimestamp = createTimestamp;
  }
  return traderEntity;
}
