// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class NFT extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save NFT entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type NFT must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("NFT", id.toString(), this);
    }
  }

  static load(id: string): NFT | null {
    return changetype<NFT | null>(store.get("NFT", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get nftAddress(): Bytes {
    let value = this.get("nftAddress");
    return value!.toBytes();
  }

  set nftAddress(value: Bytes) {
    this.set("nftAddress", Value.fromBytes(value));
  }

  get tokenId(): BigInt {
    let value = this.get("tokenId");
    return value!.toBigInt();
  }

  set tokenId(value: BigInt) {
    this.set("tokenId", Value.fromBigInt(value));
  }

  get status(): string {
    let value = this.get("status");
    return value!.toString();
  }

  set status(value: string) {
    this.set("status", Value.fromString(value));
  }

  get position(): string | null {
    let value = this.get("position");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set position(value: string | null) {
    if (!value) {
      this.unset("position");
    } else {
      this.set("position", Value.fromString(<string>value));
    }
  }

  get updateTimestamp(): i32 {
    let value = this.get("updateTimestamp");
    return value!.toI32();
  }

  set updateTimestamp(value: i32) {
    this.set("updateTimestamp", Value.fromI32(value));
  }

  get positionEndTimestamp(): i32 {
    let value = this.get("positionEndTimestamp");
    return value!.toI32();
  }

  set positionEndTimestamp(value: i32) {
    this.set("positionEndTimestamp", Value.fromI32(value));
  }

  get callPoolStat(): string {
    let value = this.get("callPoolStat");
    return value!.toString();
  }

  set callPoolStat(value: string) {
    this.set("callPoolStat", Value.fromString(value));
  }

  get callPoolAddress(): Bytes {
    let value = this.get("callPoolAddress");
    return value!.toBytes();
  }

  set callPoolAddress(value: Bytes) {
    this.set("callPoolAddress", Value.fromBytes(value));
  }

  get userAddress(): Bytes {
    let value = this.get("userAddress");
    return value!.toBytes();
  }

  set userAddress(value: Bytes) {
    this.set("userAddress", Value.fromBytes(value));
  }

  get strikePriceGapIdx(): i32 {
    let value = this.get("strikePriceGapIdx");
    return value!.toI32();
  }

  set strikePriceGapIdx(value: i32) {
    this.set("strikePriceGapIdx", Value.fromI32(value));
  }

  get durationIdx(): i32 {
    let value = this.get("durationIdx");
    return value!.toI32();
  }

  set durationIdx(value: i32) {
    this.set("durationIdx", Value.fromI32(value));
  }

  get lowerLimitOfStrikePrice(): BigInt {
    let value = this.get("lowerLimitOfStrikePrice");
    return value!.toBigInt();
  }

  set lowerLimitOfStrikePrice(value: BigInt) {
    this.set("lowerLimitOfStrikePrice", Value.fromBigInt(value));
  }
}

export class Position extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Position entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Position must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Position", id.toString(), this);
    }
  }

  static load(id: string): Position | null {
    return changetype<Position | null>(store.get("Position", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get nftOwnerAddress(): Bytes {
    let value = this.get("nftOwnerAddress");
    return value!.toBytes();
  }

  set nftOwnerAddress(value: Bytes) {
    this.set("nftOwnerAddress", Value.fromBytes(value));
  }

  get userAddress(): Bytes {
    let value = this.get("userAddress");
    return value!.toBytes();
  }

  set userAddress(value: Bytes) {
    this.set("userAddress", Value.fromBytes(value));
  }

  get nftAddress(): Bytes {
    let value = this.get("nftAddress");
    return value!.toBytes();
  }

  set nftAddress(value: Bytes) {
    this.set("nftAddress", Value.fromBytes(value));
  }

  get tokenId(): BigInt {
    let value = this.get("tokenId");
    return value!.toBigInt();
  }

  set tokenId(value: BigInt) {
    this.set("tokenId", Value.fromBigInt(value));
  }

  get callPoolAddress(): Bytes {
    let value = this.get("callPoolAddress");
    return value!.toBytes();
  }

  set callPoolAddress(value: Bytes) {
    this.set("callPoolAddress", Value.fromBytes(value));
  }

  get exerciseTime(): i32 {
    let value = this.get("exerciseTime");
    return value!.toI32();
  }

  set exerciseTime(value: i32) {
    this.set("exerciseTime", Value.fromI32(value));
  }

  get endTime(): i32 {
    let value = this.get("endTime");
    return value!.toI32();
  }

  set endTime(value: i32) {
    this.set("endTime", Value.fromI32(value));
  }

  get strikePrice(): BigInt {
    let value = this.get("strikePrice");
    return value!.toBigInt();
  }

  set strikePrice(value: BigInt) {
    this.set("strikePrice", Value.fromBigInt(value));
  }

  get premiumToOwner(): BigInt {
    let value = this.get("premiumToOwner");
    return value!.toBigInt();
  }

  set premiumToOwner(value: BigInt) {
    this.set("premiumToOwner", Value.fromBigInt(value));
  }

  get premiumToReserve(): BigInt {
    let value = this.get("premiumToReserve");
    return value!.toBigInt();
  }

  set premiumToReserve(value: BigInt) {
    this.set("premiumToReserve", Value.fromBigInt(value));
  }

  get status(): string {
    let value = this.get("status");
    return value!.toString();
  }

  set status(value: string) {
    this.set("status", Value.fromString(value));
  }

  get updateTimestamp(): i32 {
    let value = this.get("updateTimestamp");
    return value!.toI32();
  }

  set updateTimestamp(value: i32) {
    this.set("updateTimestamp", Value.fromI32(value));
  }

  get createTimestamp(): i32 {
    let value = this.get("createTimestamp");
    return value!.toI32();
  }

  set createTimestamp(value: i32) {
    this.set("createTimestamp", Value.fromI32(value));
  }
}

export class NFTTransaction extends Entity {
  constructor(id: Bytes) {
    super();
    this.set("id", Value.fromBytes(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save NFTTransaction entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.BYTES,
        `Entities of type NFTTransaction must have an ID of type Bytes but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("NFTTransaction", id.toBytes().toHexString(), this);
    }
  }

  static load(id: Bytes): NFTTransaction | null {
    return changetype<NFTTransaction | null>(
      store.get("NFTTransaction", id.toHexString())
    );
  }

  get id(): Bytes {
    let value = this.get("id");
    return value!.toBytes();
  }

  set id(value: Bytes) {
    this.set("id", Value.fromBytes(value));
  }

  get userAddress(): Bytes {
    let value = this.get("userAddress");
    return value!.toBytes();
  }

  set userAddress(value: Bytes) {
    this.set("userAddress", Value.fromBytes(value));
  }

  get nftAddress(): Bytes {
    let value = this.get("nftAddress");
    return value!.toBytes();
  }

  set nftAddress(value: Bytes) {
    this.set("nftAddress", Value.fromBytes(value));
  }

  get tokenId(): BigInt {
    let value = this.get("tokenId");
    return value!.toBigInt();
  }

  set tokenId(value: BigInt) {
    this.set("tokenId", Value.fromBigInt(value));
  }

  get soldPrice(): BigInt {
    let value = this.get("soldPrice");
    return value!.toBigInt();
  }

  set soldPrice(value: BigInt) {
    this.set("soldPrice", Value.fromBigInt(value));
  }

  get createTimestamp(): i32 {
    let value = this.get("createTimestamp");
    return value!.toI32();
  }

  set createTimestamp(value: i32) {
    this.set("createTimestamp", Value.fromI32(value));
  }

  get transactionHash(): Bytes {
    let value = this.get("transactionHash");
    return value!.toBytes();
  }

  set transactionHash(value: Bytes) {
    this.set("transactionHash", Value.fromBytes(value));
  }
}

export class UserStat extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save UserStat entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type UserStat must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("UserStat", id.toString(), this);
    }
  }

  static load(id: string): UserStat | null {
    return changetype<UserStat | null>(store.get("UserStat", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get accumulativeEarnings(): BigInt {
    let value = this.get("accumulativeEarnings");
    return value!.toBigInt();
  }

  set accumulativeEarnings(value: BigInt) {
    this.set("accumulativeEarnings", Value.fromBigInt(value));
  }

  get userCallPoolStat(): Array<string> {
    let value = this.get("userCallPoolStat");
    return value!.toStringArray();
  }

  set userCallPoolStat(value: Array<string>) {
    this.set("userCallPoolStat", Value.fromStringArray(value));
  }
}

export class UserCallPoolStat extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save UserCallPoolStat entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type UserCallPoolStat must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("UserCallPoolStat", id.toString(), this);
    }
  }

  static load(id: string): UserCallPoolStat | null {
    return changetype<UserCallPoolStat | null>(
      store.get("UserCallPoolStat", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get userAddress(): Bytes {
    let value = this.get("userAddress");
    return value!.toBytes();
  }

  set userAddress(value: Bytes) {
    this.set("userAddress", Value.fromBytes(value));
  }

  get callPoolAddress(): Bytes {
    let value = this.get("callPoolAddress");
    return value!.toBytes();
  }

  set callPoolAddress(value: Bytes) {
    this.set("callPoolAddress", Value.fromBytes(value));
  }

  get accruedEarnings(): BigInt {
    let value = this.get("accruedEarnings");
    return value!.toBigInt();
  }

  set accruedEarnings(value: BigInt) {
    this.set("accruedEarnings", Value.fromBigInt(value));
  }
}

export class CallPoolStat extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save CallPoolStat entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type CallPoolStat must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("CallPoolStat", id.toString(), this);
    }
  }

  static load(id: string): CallPoolStat | null {
    return changetype<CallPoolStat | null>(store.get("CallPoolStat", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get accumulativePremium(): BigInt {
    let value = this.get("accumulativePremium");
    return value!.toBigInt();
  }

  set accumulativePremium(value: BigInt) {
    this.set("accumulativePremium", Value.fromBigInt(value));
  }

  get totalTradingVolume(): BigInt {
    let value = this.get("totalTradingVolume");
    return value!.toBigInt();
  }

  set totalTradingVolume(value: BigInt) {
    this.set("totalTradingVolume", Value.fromBigInt(value));
  }

  get totalDepositedNFTs(): i32 {
    let value = this.get("totalDepositedNFTs");
    return value!.toI32();
  }

  set totalDepositedNFTs(value: i32) {
    this.set("totalDepositedNFTs", Value.fromI32(value));
  }

  get totalOptionContracts(): i32 {
    let value = this.get("totalOptionContracts");
    return value!.toI32();
  }

  set totalOptionContracts(value: i32) {
    this.set("totalOptionContracts", Value.fromI32(value));
  }

  get nfts(): Array<string> {
    let value = this.get("nfts");
    return value!.toStringArray();
  }

  set nfts(value: Array<string>) {
    this.set("nfts", Value.fromStringArray(value));
  }
}
