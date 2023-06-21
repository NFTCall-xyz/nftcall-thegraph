import { BigInt, ByteArray, Bytes, crypto } from "@graphprotocol/graph-ts";

export function getOptionPositionId(
  nftAddress: Bytes,
  positionId: BigInt
): string {
  const nft = nftAddress.toHexString();
  const id = positionId.toHexString();
  return crypto.keccak256(ByteArray.fromUTF8(nft + id)).toHexString();
}
