import { BigInt, ByteArray, Bytes, crypto } from "@graphprotocol/graph-ts";
import { UserStat, UserCallPoolStat } from "../../generated/schema";

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

export function addUserAccruedEarnings(
  userAddress: Bytes,
  callPoolAddress: Bytes,
  amount: BigInt
): void {
  const userCallPoolStatId = getUserCallPoolStatId(
    userAddress,
    callPoolAddress
  );
  let userCallPoolStatRecord = UserCallPoolStat.load(userCallPoolStatId);
  if (!userCallPoolStatRecord) {
    userCallPoolStatRecord = new UserCallPoolStat(userCallPoolStatId);
    userCallPoolStatRecord.userAddress = userAddress;
    userCallPoolStatRecord.callPoolAddress = callPoolAddress;
    userCallPoolStatRecord.accruedEarnings = BigInt.fromI32(0);
  }

  userCallPoolStatRecord.accruedEarnings = userCallPoolStatRecord.accruedEarnings.plus(
    amount
  );
  userCallPoolStatRecord.save();

  const userStatsId = userAddress.toHexString();
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
    amount
  );
  userStatsRecord.save();
}
