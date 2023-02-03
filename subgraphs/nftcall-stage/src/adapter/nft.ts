import { BigInt, ByteArray, Bytes, crypto } from "@graphprotocol/graph-ts";

export function getNFTId(nftAddress: Bytes, tokenId: BigInt): string {
  const nft = nftAddress.toHexString();
  const id = tokenId.toHexString();
  return crypto.keccak256(ByteArray.fromUTF8(nft + id)).toHexString();
}
