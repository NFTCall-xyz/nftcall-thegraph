import { BigInt } from "@graphprotocol/graph-ts";
import { CallPoolStat } from "../../generated/schema";

export function setTotalDepositedNFTs(
  callPoolStats: CallPoolStat,
  value: i32
): void {
  callPoolStats.totalDepositedNFTs = callPoolStats.totalDepositedNFTs + value;
  if (callPoolStats.totalDepositedNFTs < 0) {
    callPoolStats.totalDepositedNFTs = 0;
  }
}

export function getCallPoolStats(callPoolStatsId: string): CallPoolStat {
  let callPoolStats = CallPoolStat.load(callPoolStatsId);
  if (!callPoolStats) {
    callPoolStats = new CallPoolStat(callPoolStatsId);
    callPoolStats.accumulativePremium = BigInt.fromI32(0);
    callPoolStats.totalTradingVolume = BigInt.fromI32(0);
    callPoolStats.totalDepositedNFTs = 0;
    callPoolStats.totalOptionContracts = 0;
  }
  return callPoolStats;
}
