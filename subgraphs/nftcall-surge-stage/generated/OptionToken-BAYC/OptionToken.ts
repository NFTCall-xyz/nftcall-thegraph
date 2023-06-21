// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class ActivePosition extends ethereum.Event {
  get params(): ActivePosition__Params {
    return new ActivePosition__Params(this);
  }
}

export class ActivePosition__Params {
  _event: ActivePosition;

  constructor(event: ActivePosition) {
    this._event = event;
  }

  get positionId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get premium(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class Approval extends ethereum.Event {
  get params(): Approval__Params {
    return new Approval__Params(this);
  }
}

export class Approval__Params {
  _event: Approval;

  constructor(event: Approval) {
    this._event = event;
  }

  get owner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get approved(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class ApprovalForAll extends ethereum.Event {
  get params(): ApprovalForAll__Params {
    return new ApprovalForAll__Params(this);
  }
}

export class ApprovalForAll__Params {
  _event: ApprovalForAll;

  constructor(event: ApprovalForAll) {
    this._event = event;
  }

  get owner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get operator(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get approved(): boolean {
    return this._event.parameters[2].value.toBoolean();
  }
}

export class ClosePosition extends ethereum.Event {
  get params(): ClosePosition__Params {
    return new ClosePosition__Params(this);
  }
}

export class ClosePosition__Params {
  _event: ClosePosition;

  constructor(event: ClosePosition) {
    this._event = event;
  }

  get positionId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class ForceClosePosition extends ethereum.Event {
  get params(): ForceClosePosition__Params {
    return new ForceClosePosition__Params(this);
  }
}

export class ForceClosePosition__Params {
  _event: ForceClosePosition;

  constructor(event: ForceClosePosition) {
    this._event = event;
  }

  get positionId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class Initialize extends ethereum.Event {
  get params(): Initialize__Params {
    return new Initialize__Params(this);
  }
}

export class Initialize__Params {
  _event: Initialize;

  constructor(event: Initialize) {
    this._event = event;
  }

  get vault(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class OpenPosition extends ethereum.Event {
  get params(): OpenPosition__Params {
    return new OpenPosition__Params(this);
  }
}

export class OpenPosition__Params {
  _event: OpenPosition;

  constructor(event: OpenPosition) {
    this._event = event;
  }

  get payer(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get to(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get positionId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get optionType(): i32 {
    return this._event.parameters[3].value.toI32();
  }

  get strikeId(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }

  get amount(): BigInt {
    return this._event.parameters[5].value.toBigInt();
  }

  get maximumPremium(): BigInt {
    return this._event.parameters[6].value.toBigInt();
  }
}

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class Transfer extends ethereum.Event {
  get params(): Transfer__Params {
    return new Transfer__Params(this);
  }
}

export class Transfer__Params {
  _event: Transfer;

  constructor(event: Transfer) {
    this._event = event;
  }

  get from(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get to(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class UpdateBaseURI extends ethereum.Event {
  get params(): UpdateBaseURI__Params {
    return new UpdateBaseURI__Params(this);
  }
}

export class UpdateBaseURI__Params {
  _event: UpdateBaseURI;

  constructor(event: UpdateBaseURI) {
    this._event = event;
  }

  get baseURI(): string {
    return this._event.parameters[0].value.toString();
  }
}

export class OptionToken__optionPositionResultPositionStruct extends ethereum.Tuple {
  get state(): i32 {
    return this[0].toI32();
  }

  get optionType(): i32 {
    return this[1].toI32();
  }

  get payer(): Address {
    return this[2].toAddress();
  }

  get strikeId(): BigInt {
    return this[3].toBigInt();
  }

  get amount(): BigInt {
    return this[4].toBigInt();
  }

  get premium(): BigInt {
    return this[5].toBigInt();
  }

  get maximumPremium(): BigInt {
    return this[6].toBigInt();
  }
}

export class OptionToken extends ethereum.SmartContract {
  static bind(address: Address): OptionToken {
    return new OptionToken("OptionToken", address);
  }

  balanceOf(owner: Address): BigInt {
    let result = super.call("balanceOf", "balanceOf(address):(uint256)", [
      ethereum.Value.fromAddress(owner)
    ]);

    return result[0].toBigInt();
  }

  try_balanceOf(owner: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall("balanceOf", "balanceOf(address):(uint256)", [
      ethereum.Value.fromAddress(owner)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  collection(): Address {
    let result = super.call("collection", "collection():(address)", []);

    return result[0].toAddress();
  }

  try_collection(): ethereum.CallResult<Address> {
    let result = super.tryCall("collection", "collection():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getApproved(tokenId: BigInt): Address {
    let result = super.call("getApproved", "getApproved(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);

    return result[0].toAddress();
  }

  try_getApproved(tokenId: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "getApproved",
      "getApproved(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(tokenId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  isApprovedForAll(owner: Address, operator: Address): boolean {
    let result = super.call(
      "isApprovedForAll",
      "isApprovedForAll(address,address):(bool)",
      [ethereum.Value.fromAddress(owner), ethereum.Value.fromAddress(operator)]
    );

    return result[0].toBoolean();
  }

  try_isApprovedForAll(
    owner: Address,
    operator: Address
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "isApprovedForAll",
      "isApprovedForAll(address,address):(bool)",
      [ethereum.Value.fromAddress(owner), ethereum.Value.fromAddress(operator)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  lockedValue(positionId: BigInt): BigInt {
    let result = super.call("lockedValue", "lockedValue(uint256):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(positionId)
    ]);

    return result[0].toBigInt();
  }

  try_lockedValue(positionId: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "lockedValue",
      "lockedValue(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(positionId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  name(): string {
    let result = super.call("name", "name():(string)", []);

    return result[0].toString();
  }

  try_name(): ethereum.CallResult<string> {
    let result = super.tryCall("name", "name():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  openPosition(
    payer: Address,
    to: Address,
    optionType: i32,
    strikeId: BigInt,
    amount: BigInt,
    maximumPremium: BigInt
  ): BigInt {
    let result = super.call(
      "openPosition",
      "openPosition(address,address,uint8,uint256,uint256,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(payer),
        ethereum.Value.fromAddress(to),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(optionType)),
        ethereum.Value.fromUnsignedBigInt(strikeId),
        ethereum.Value.fromUnsignedBigInt(amount),
        ethereum.Value.fromUnsignedBigInt(maximumPremium)
      ]
    );

    return result[0].toBigInt();
  }

  try_openPosition(
    payer: Address,
    to: Address,
    optionType: i32,
    strikeId: BigInt,
    amount: BigInt,
    maximumPremium: BigInt
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "openPosition",
      "openPosition(address,address,uint8,uint256,uint256,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(payer),
        ethereum.Value.fromAddress(to),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(optionType)),
        ethereum.Value.fromUnsignedBigInt(strikeId),
        ethereum.Value.fromUnsignedBigInt(amount),
        ethereum.Value.fromUnsignedBigInt(maximumPremium)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  optionPosition(
    positionId: BigInt
  ): OptionToken__optionPositionResultPositionStruct {
    let result = super.call(
      "optionPosition",
      "optionPosition(uint256):((uint8,uint8,address,uint256,uint256,uint256,uint256))",
      [ethereum.Value.fromUnsignedBigInt(positionId)]
    );

    return changetype<OptionToken__optionPositionResultPositionStruct>(
      result[0].toTuple()
    );
  }

  try_optionPosition(
    positionId: BigInt
  ): ethereum.CallResult<OptionToken__optionPositionResultPositionStruct> {
    let result = super.tryCall(
      "optionPosition",
      "optionPosition(uint256):((uint8,uint8,address,uint256,uint256,uint256,uint256))",
      [ethereum.Value.fromUnsignedBigInt(positionId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      changetype<OptionToken__optionPositionResultPositionStruct>(
        value[0].toTuple()
      )
    );
  }

  optionPositionState(positionId: BigInt): i32 {
    let result = super.call(
      "optionPositionState",
      "optionPositionState(uint256):(uint8)",
      [ethereum.Value.fromUnsignedBigInt(positionId)]
    );

    return result[0].toI32();
  }

  try_optionPositionState(positionId: BigInt): ethereum.CallResult<i32> {
    let result = super.tryCall(
      "optionPositionState",
      "optionPositionState(uint256):(uint8)",
      [ethereum.Value.fromUnsignedBigInt(positionId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toI32());
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  ownerOf(tokenId: BigInt): Address {
    let result = super.call("ownerOf", "ownerOf(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);

    return result[0].toAddress();
  }

  try_ownerOf(tokenId: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall("ownerOf", "ownerOf(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  supportsInterface(interfaceId: Bytes): boolean {
    let result = super.call(
      "supportsInterface",
      "supportsInterface(bytes4):(bool)",
      [ethereum.Value.fromFixedBytes(interfaceId)]
    );

    return result[0].toBoolean();
  }

  try_supportsInterface(interfaceId: Bytes): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "supportsInterface",
      "supportsInterface(bytes4):(bool)",
      [ethereum.Value.fromFixedBytes(interfaceId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  symbol(): string {
    let result = super.call("symbol", "symbol():(string)", []);

    return result[0].toString();
  }

  try_symbol(): ethereum.CallResult<string> {
    let result = super.tryCall("symbol", "symbol():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  tokenByIndex(index: BigInt): BigInt {
    let result = super.call("tokenByIndex", "tokenByIndex(uint256):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(index)
    ]);

    return result[0].toBigInt();
  }

  try_tokenByIndex(index: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "tokenByIndex",
      "tokenByIndex(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(index)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  tokenOfOwnerByIndex(owner: Address, index: BigInt): BigInt {
    let result = super.call(
      "tokenOfOwnerByIndex",
      "tokenOfOwnerByIndex(address,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(owner),
        ethereum.Value.fromUnsignedBigInt(index)
      ]
    );

    return result[0].toBigInt();
  }

  try_tokenOfOwnerByIndex(
    owner: Address,
    index: BigInt
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "tokenOfOwnerByIndex",
      "tokenOfOwnerByIndex(address,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(owner),
        ethereum.Value.fromUnsignedBigInt(index)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  tokenURI(tokenId: BigInt): string {
    let result = super.call("tokenURI", "tokenURI(uint256):(string)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);

    return result[0].toString();
  }

  try_tokenURI(tokenId: BigInt): ethereum.CallResult<string> {
    let result = super.tryCall("tokenURI", "tokenURI(uint256):(string)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  totalAmount(): BigInt {
    let result = super.call("totalAmount", "totalAmount():(uint256)", []);

    return result[0].toBigInt();
  }

  try_totalAmount(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("totalAmount", "totalAmount():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  totalSupply(): BigInt {
    let result = super.call("totalSupply", "totalSupply():(uint256)", []);

    return result[0].toBigInt();
  }

  try_totalSupply(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("totalSupply", "totalSupply():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  totalValue(): BigInt {
    let result = super.call("totalValue", "totalValue():(uint256)", []);

    return result[0].toBigInt();
  }

  try_totalValue(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("totalValue", "totalValue():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  vault(): Address {
    let result = super.call("vault", "vault():(address)", []);

    return result[0].toAddress();
  }

  try_vault(): ethereum.CallResult<Address> {
    let result = super.tryCall("vault", "vault():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get collectionAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get name_(): string {
    return this._call.inputValues[1].value.toString();
  }

  get symbol_(): string {
    return this._call.inputValues[2].value.toString();
  }

  get baseURI(): string {
    return this._call.inputValues[3].value.toString();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class ActivePositionCall extends ethereum.Call {
  get inputs(): ActivePositionCall__Inputs {
    return new ActivePositionCall__Inputs(this);
  }

  get outputs(): ActivePositionCall__Outputs {
    return new ActivePositionCall__Outputs(this);
  }
}

export class ActivePositionCall__Inputs {
  _call: ActivePositionCall;

  constructor(call: ActivePositionCall) {
    this._call = call;
  }

  get positionId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get premium(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class ActivePositionCall__Outputs {
  _call: ActivePositionCall;

  constructor(call: ActivePositionCall) {
    this._call = call;
  }
}

export class ApproveCall extends ethereum.Call {
  get inputs(): ApproveCall__Inputs {
    return new ApproveCall__Inputs(this);
  }

  get outputs(): ApproveCall__Outputs {
    return new ApproveCall__Outputs(this);
  }
}

export class ApproveCall__Inputs {
  _call: ApproveCall;

  constructor(call: ApproveCall) {
    this._call = call;
  }

  get to(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class ApproveCall__Outputs {
  _call: ApproveCall;

  constructor(call: ApproveCall) {
    this._call = call;
  }
}

export class ClosePositionCall extends ethereum.Call {
  get inputs(): ClosePositionCall__Inputs {
    return new ClosePositionCall__Inputs(this);
  }

  get outputs(): ClosePositionCall__Outputs {
    return new ClosePositionCall__Outputs(this);
  }
}

export class ClosePositionCall__Inputs {
  _call: ClosePositionCall;

  constructor(call: ClosePositionCall) {
    this._call = call;
  }

  get positionId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class ClosePositionCall__Outputs {
  _call: ClosePositionCall;

  constructor(call: ClosePositionCall) {
    this._call = call;
  }
}

export class ForceClosePendingPositionCall extends ethereum.Call {
  get inputs(): ForceClosePendingPositionCall__Inputs {
    return new ForceClosePendingPositionCall__Inputs(this);
  }

  get outputs(): ForceClosePendingPositionCall__Outputs {
    return new ForceClosePendingPositionCall__Outputs(this);
  }
}

export class ForceClosePendingPositionCall__Inputs {
  _call: ForceClosePendingPositionCall;

  constructor(call: ForceClosePendingPositionCall) {
    this._call = call;
  }

  get positionId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class ForceClosePendingPositionCall__Outputs {
  _call: ForceClosePendingPositionCall;

  constructor(call: ForceClosePendingPositionCall) {
    this._call = call;
  }
}

export class InitializeCall extends ethereum.Call {
  get inputs(): InitializeCall__Inputs {
    return new InitializeCall__Inputs(this);
  }

  get outputs(): InitializeCall__Outputs {
    return new InitializeCall__Outputs(this);
  }
}

export class InitializeCall__Inputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }

  get vaultAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class InitializeCall__Outputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }
}

export class OpenPositionCall extends ethereum.Call {
  get inputs(): OpenPositionCall__Inputs {
    return new OpenPositionCall__Inputs(this);
  }

  get outputs(): OpenPositionCall__Outputs {
    return new OpenPositionCall__Outputs(this);
  }
}

export class OpenPositionCall__Inputs {
  _call: OpenPositionCall;

  constructor(call: OpenPositionCall) {
    this._call = call;
  }

  get payer(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get optionType(): i32 {
    return this._call.inputValues[2].value.toI32();
  }

  get strikeId(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }

  get amount(): BigInt {
    return this._call.inputValues[4].value.toBigInt();
  }

  get maximumPremium(): BigInt {
    return this._call.inputValues[5].value.toBigInt();
  }
}

export class OpenPositionCall__Outputs {
  _call: OpenPositionCall;

  constructor(call: OpenPositionCall) {
    this._call = call;
  }

  get value0(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class RenounceOwnershipCall extends ethereum.Call {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class SafeTransferFromCall extends ethereum.Call {
  get inputs(): SafeTransferFromCall__Inputs {
    return new SafeTransferFromCall__Inputs(this);
  }

  get outputs(): SafeTransferFromCall__Outputs {
    return new SafeTransferFromCall__Outputs(this);
  }
}

export class SafeTransferFromCall__Inputs {
  _call: SafeTransferFromCall;

  constructor(call: SafeTransferFromCall) {
    this._call = call;
  }

  get from(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class SafeTransferFromCall__Outputs {
  _call: SafeTransferFromCall;

  constructor(call: SafeTransferFromCall) {
    this._call = call;
  }
}

export class SafeTransferFrom1Call extends ethereum.Call {
  get inputs(): SafeTransferFrom1Call__Inputs {
    return new SafeTransferFrom1Call__Inputs(this);
  }

  get outputs(): SafeTransferFrom1Call__Outputs {
    return new SafeTransferFrom1Call__Outputs(this);
  }
}

export class SafeTransferFrom1Call__Inputs {
  _call: SafeTransferFrom1Call;

  constructor(call: SafeTransferFrom1Call) {
    this._call = call;
  }

  get from(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get data(): Bytes {
    return this._call.inputValues[3].value.toBytes();
  }
}

export class SafeTransferFrom1Call__Outputs {
  _call: SafeTransferFrom1Call;

  constructor(call: SafeTransferFrom1Call) {
    this._call = call;
  }
}

export class SetApprovalForAllCall extends ethereum.Call {
  get inputs(): SetApprovalForAllCall__Inputs {
    return new SetApprovalForAllCall__Inputs(this);
  }

  get outputs(): SetApprovalForAllCall__Outputs {
    return new SetApprovalForAllCall__Outputs(this);
  }
}

export class SetApprovalForAllCall__Inputs {
  _call: SetApprovalForAllCall;

  constructor(call: SetApprovalForAllCall) {
    this._call = call;
  }

  get operator(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get approved(): boolean {
    return this._call.inputValues[1].value.toBoolean();
  }
}

export class SetApprovalForAllCall__Outputs {
  _call: SetApprovalForAllCall;

  constructor(call: SetApprovalForAllCall) {
    this._call = call;
  }
}

export class SetBaseURICall extends ethereum.Call {
  get inputs(): SetBaseURICall__Inputs {
    return new SetBaseURICall__Inputs(this);
  }

  get outputs(): SetBaseURICall__Outputs {
    return new SetBaseURICall__Outputs(this);
  }
}

export class SetBaseURICall__Inputs {
  _call: SetBaseURICall;

  constructor(call: SetBaseURICall) {
    this._call = call;
  }

  get baseURI(): string {
    return this._call.inputValues[0].value.toString();
  }
}

export class SetBaseURICall__Outputs {
  _call: SetBaseURICall;

  constructor(call: SetBaseURICall) {
    this._call = call;
  }
}

export class TransferFromCall extends ethereum.Call {
  get inputs(): TransferFromCall__Inputs {
    return new TransferFromCall__Inputs(this);
  }

  get outputs(): TransferFromCall__Outputs {
    return new TransferFromCall__Outputs(this);
  }
}

export class TransferFromCall__Inputs {
  _call: TransferFromCall;

  constructor(call: TransferFromCall) {
    this._call = call;
  }

  get from(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class TransferFromCall__Outputs {
  _call: TransferFromCall;

  constructor(call: TransferFromCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}
