import { BigInt } from "@graphprotocol/graph-ts";
import {
  ActivePosition as ActivePositionEvent,
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  ClosePosition as ClosePositionEvent,
  ForceClosePosition as ForceClosePositionEvent,
  Initialize as InitializeEvent,
  OpenPosition as OpenPositionEvent,
  Transfer as TransferEvent,
  UpdateBaseURI as UpdateBaseURIEvent,
  OptionToken,
} from "../generated/OptionToken-BAYC/OptionToken";
import {
  ActivePosition,
  Approval,
  ApprovalForAll,
  ClosePosition,
  ForceClosePosition,
  Initialize,
  OpenPosition,
  Transfer,
  UpdateBaseURI,
  OptionPosition,
} from "../generated/schema";
import { getOptionPositionId } from "./adapter/option-position";

export function handleActivePosition(event: ActivePositionEvent): void {
  let entity = new ActivePosition(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.positionId = event.params.positionId;
  entity.premium = event.params.premium;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  const optionTokenContract = OptionToken.bind(event.address);
  const nftAddress = optionTokenContract.collection();
  let positionEntity = new OptionPosition(
    getOptionPositionId(nftAddress, event.params.positionId)
  );

  positionEntity.premium = event.params.premium;
  positionEntity.status = "Active";
  positionEntity.updateTimestamp = event.block.timestamp.toI32();
  positionEntity.save();
}

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.owner = event.params.owner;
  entity.approved = event.params.approved;
  entity.tokenId = event.params.tokenId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  let entity = new ApprovalForAll(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.owner = event.params.owner;
  entity.operator = event.params.operator;
  entity.approved = event.params.approved;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleClosePosition(event: ClosePositionEvent): void {
  let entity = new ClosePosition(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.positionId = event.params.positionId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  const optionTokenContract = OptionToken.bind(event.address);
  const nftAddress = optionTokenContract.collection();
  let positionEntity = new OptionPosition(
    getOptionPositionId(nftAddress, event.params.positionId)
  );

  positionEntity.status = "Closed";
  positionEntity.updateTimestamp = event.block.timestamp.toI32();
  positionEntity.save();
}

export function handleForceClosePosition(event: ForceClosePositionEvent): void {
  let entity = new ForceClosePosition(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.positionId = event.params.positionId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  const optionTokenContract = OptionToken.bind(event.address);
  const nftAddress = optionTokenContract.collection();
  let positionEntity = new OptionPosition(
    getOptionPositionId(nftAddress, event.params.positionId)
  );

  positionEntity.status = "Failed";
  positionEntity.updateTimestamp = event.block.timestamp.toI32();
  positionEntity.save();
}

export function handleInitialize(event: InitializeEvent): void {
  let entity = new Initialize(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.vault = event.params.vault;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleOpenPosition(event: OpenPositionEvent): void {
  let entity = new OpenPosition(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.to = event.params.to;
  entity.positionId = event.params.positionId;
  entity.optionType = event.params.optionType;
  entity.strikeId = event.params.strikeId;
  entity.amount = event.params.amount;
  entity.maximumPremium = event.params.maximumPremium;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  const optionTokenContract = OptionToken.bind(event.address);
  const nftAddress = optionTokenContract.collection();

  let positionEntity = new OptionPosition(
    getOptionPositionId(nftAddress, event.params.positionId)
  );

  positionEntity.status = "Pending";
  positionEntity.premium = BigInt.fromI32(0);
  positionEntity.maximumPremium = event.params.maximumPremium;
  positionEntity.amount = event.params.amount;
  positionEntity.optionType = event.params.optionType;
  positionEntity.userAddress = event.params.to;
  positionEntity.nftAddress = nftAddress;
  positionEntity.strikeId = event.params.strikeId.toHexString();
  positionEntity.positionId = event.params.positionId;
  positionEntity.createTimestamp = event.block.timestamp.toI32();
  positionEntity.updateTimestamp = event.block.timestamp.toI32();

  positionEntity.save();
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.tokenId = event.params.tokenId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleUpdateBaseURI(event: UpdateBaseURIEvent): void {
  let entity = new UpdateBaseURI(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.baseURI = event.params.baseURI;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
