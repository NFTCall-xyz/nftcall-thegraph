import { BigInt, ByteArray, Bytes, crypto } from "@graphprotocol/graph-ts";

export function getOptionPositionId(
  collectionAddress: Bytes,
  positionId: BigInt
): string {
  const collection = collectionAddress.toHexString();
  const id = positionId.toHexString();
  return crypto.keccak256(ByteArray.fromUTF8(collection + id)).toHexString();
}
