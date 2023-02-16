import {
  BigDecimal,
  BigInt,
  ByteArray,
  Bytes,
  crypto,
} from "@graphprotocol/graph-ts";
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
function getUserStatRecord(
  userStatsId: string,
  userCallPoolStatId: string
): UserStat {
  let userStatsRecord = UserStat.load(userStatsId);
  if (!userStatsRecord) {
    userStatsRecord = new UserStat(userStatsId);
    userStatsRecord.accumulativeEarnings = BigInt.fromI32(0);
    userStatsRecord.sellerYield = BigDecimal.zero();
    userStatsRecord.totalDuration = BigInt.fromI32(0);
    userStatsRecord.userCallPoolStat = new Array(0);
    userStatPushUserCallPoolStatId(userStatsRecord, userCallPoolStatId);
  } else {
    if (
      userStatHasUserCallPoolStatId(userStatsRecord, userCallPoolStatId) === -1
    ) {
      userStatPushUserCallPoolStatId(userStatsRecord, userCallPoolStatId);
    }
  }

  return userStatsRecord;
}

function getUserCallPoolStatRecord(
  userCallPoolStatId: string,
  userAddress: Bytes,
  callPoolAddress: Bytes
): UserCallPoolStat {
  let userCallPoolStatRecord = UserCallPoolStat.load(userCallPoolStatId);
  if (!userCallPoolStatRecord) {
    userCallPoolStatRecord = new UserCallPoolStat(userCallPoolStatId);
    userCallPoolStatRecord.userAddress = userAddress;
    userCallPoolStatRecord.callPoolAddress = callPoolAddress;
    userCallPoolStatRecord.accruedEarnings = BigInt.fromI32(0);
  }

  return userCallPoolStatRecord;
}

export function addUserAccruedEarnings(
  userAddress: Bytes,
  callPoolAddress: Bytes,
  amount: BigInt
): void {
  const userCallPoolStatId = getUserCallPoolStatId(
    userAddress,
    callPoolAddress
  );

  const userCallPoolStatRecord = getUserCallPoolStatRecord(
    userCallPoolStatId,
    userAddress,
    callPoolAddress
  );

  userCallPoolStatRecord.accruedEarnings = userCallPoolStatRecord.accruedEarnings.plus(
    amount
  );
  userCallPoolStatRecord.save();

  const userStatsId = userAddress.toHexString();
  const userStatsRecord = getUserStatRecord(userStatsId, userCallPoolStatId);

  userStatsRecord.accumulativeEarnings = userStatsRecord.accumulativeEarnings.plus(
    amount
  );
  userStatsRecord.save();
}

export function addUserSellerAPY(
  userAddress: Bytes,
  callPoolAddress: Bytes,
  premium: BigInt,
  floorPrice: BigInt,
  duration: BigInt
): void {
  const userCallPoolStatId = getUserCallPoolStatId(
    userAddress,
    callPoolAddress
  );
  const userStatsId = userAddress.toHexString();
  const userStatsRecord = getUserStatRecord(userStatsId, userCallPoolStatId);

  const premiumDecimal = BigDecimal.fromString(premium.toString());
  const floorPriceDecimal = BigDecimal.fromString(floorPrice.toString());

  userStatsRecord.sellerYield = userStatsRecord.sellerYield.plus(
    premiumDecimal.div(floorPriceDecimal)
  );
  userStatsRecord.totalDuration = userStatsRecord.totalDuration.plus(duration);
  userStatsRecord.save();
}

export function decreaseUserSellerTotalDuration(
  userAddress: Bytes,
  callPoolAddress: Bytes,
  duration: BigInt
): void {
  const userCallPoolStatId = getUserCallPoolStatId(
    userAddress,
    callPoolAddress
  );
  const userStatsId = userAddress.toHexString();
  const userStatsRecord = getUserStatRecord(userStatsId, userCallPoolStatId);
  userStatsRecord.totalDuration = userStatsRecord.totalDuration.minus(duration);
  userStatsRecord.save();
}
