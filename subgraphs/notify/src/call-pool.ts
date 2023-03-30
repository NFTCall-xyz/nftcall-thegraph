import {
  CallClosed as CallClosedEvent,
  CallOpened as CallOpenedEvent,
  CallPool,
} from "../generated/CloneXPool/CallPool"
import {
  NToken,
} from "../generated/CloneXPool/NToken"
import {
  CallClosed,
  CallOpened,
} from "../generated/schema"

export function handleCallClosed(event: CallClosedEvent): void {
  let entity = new CallClosed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.pool = event.address
  entity.nft = event.params.nft
  entity.user = event.params.user
  entity.owner = event.params.owner
  entity.tokenId = event.params.tokenId
  entity.price = event.params.price

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleCallOpened(event: CallOpenedEvent): void {
  let entity = new CallOpened(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.pool = event.address
  entity.nft = event.params.nft
  entity.user = event.params.user
  entity.tokenId = event.params.tokenId
  entity.strikePriceGapIdx = event.params.strikePriceGapIdx
  entity.durationIdx = event.params.durationIdx
  entity.exercisePrice = event.params.exercisePrice
  entity.exercisePeriodBegin = event.params.exercisePeriodBegin
  entity.exercisePeriodEnd = event.params.exercisePeriodEnd

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  // get owner (seller)
  const callPoolContract = CallPool.bind(event.address);
  const nTokenAddress = callPoolContract.nToken();
  const nToken = NToken.bind(nTokenAddress);
  entity.owner = nToken.ownerOf(event.params.tokenId)

  entity.save()
}
