import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  Activate,
  BalanceChangedETH,
  CallClosed,
  CallOpened,
  CollectProtocol,
  Deactivate,
  Deposit,
  OffMarket,
  OnMarket,
  Paused,
  PreferenceUpdated,
  PremiumReceived,
  Unpaused,
  Withdraw,
  WithdrawETH
} from "../generated/CallPool/CallPool"

export function createActivateEvent(account: Address): Activate {
  let activateEvent = changetype<Activate>(newMockEvent())

  activateEvent.parameters = new Array()

  activateEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return activateEvent
}

export function createBalanceChangedETHEvent(
  user: Address,
  newBalance: BigInt
): BalanceChangedETH {
  let balanceChangedEthEvent = changetype<BalanceChangedETH>(newMockEvent())

  balanceChangedEthEvent.parameters = new Array()

  balanceChangedEthEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  balanceChangedEthEvent.parameters.push(
    new ethereum.EventParam(
      "newBalance",
      ethereum.Value.fromUnsignedBigInt(newBalance)
    )
  )

  return balanceChangedEthEvent
}

export function createCallClosedEvent(
  nft: Address,
  user: Address,
  owner: Address,
  tokenId: BigInt,
  price: BigInt
): CallClosed {
  let callClosedEvent = changetype<CallClosed>(newMockEvent())

  callClosedEvent.parameters = new Array()

  callClosedEvent.parameters.push(
    new ethereum.EventParam("nft", ethereum.Value.fromAddress(nft))
  )
  callClosedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  callClosedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  callClosedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  callClosedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return callClosedEvent
}

export function createCallOpenedEvent(
  nft: Address,
  user: Address,
  tokenId: BigInt,
  strikePriceGapIdx: i32,
  durationIdx: i32,
  exercisePrice: BigInt,
  exercisePeriodBegin: BigInt,
  exercisePeriodEnd: BigInt
): CallOpened {
  let callOpenedEvent = changetype<CallOpened>(newMockEvent())

  callOpenedEvent.parameters = new Array()

  callOpenedEvent.parameters.push(
    new ethereum.EventParam("nft", ethereum.Value.fromAddress(nft))
  )
  callOpenedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  callOpenedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  callOpenedEvent.parameters.push(
    new ethereum.EventParam(
      "strikePriceGapIdx",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(strikePriceGapIdx))
    )
  )
  callOpenedEvent.parameters.push(
    new ethereum.EventParam(
      "durationIdx",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(durationIdx))
    )
  )
  callOpenedEvent.parameters.push(
    new ethereum.EventParam(
      "exercisePrice",
      ethereum.Value.fromUnsignedBigInt(exercisePrice)
    )
  )
  callOpenedEvent.parameters.push(
    new ethereum.EventParam(
      "exercisePeriodBegin",
      ethereum.Value.fromUnsignedBigInt(exercisePeriodBegin)
    )
  )
  callOpenedEvent.parameters.push(
    new ethereum.EventParam(
      "exercisePeriodEnd",
      ethereum.Value.fromUnsignedBigInt(exercisePeriodEnd)
    )
  )

  return callOpenedEvent
}

export function createCollectProtocolEvent(
  sender: Address,
  recipient: Address,
  amount: BigInt
): CollectProtocol {
  let collectProtocolEvent = changetype<CollectProtocol>(newMockEvent())

  collectProtocolEvent.parameters = new Array()

  collectProtocolEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  collectProtocolEvent.parameters.push(
    new ethereum.EventParam("recipient", ethereum.Value.fromAddress(recipient))
  )
  collectProtocolEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return collectProtocolEvent
}

export function createDeactivateEvent(account: Address): Deactivate {
  let deactivateEvent = changetype<Deactivate>(newMockEvent())

  deactivateEvent.parameters = new Array()

  deactivateEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return deactivateEvent
}

export function createDepositEvent(
  nft: Address,
  user: Address,
  onBehalfOf: Address,
  tokenId: BigInt
): Deposit {
  let depositEvent = changetype<Deposit>(newMockEvent())

  depositEvent.parameters = new Array()

  depositEvent.parameters.push(
    new ethereum.EventParam("nft", ethereum.Value.fromAddress(nft))
  )
  depositEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  depositEvent.parameters.push(
    new ethereum.EventParam(
      "onBehalfOf",
      ethereum.Value.fromAddress(onBehalfOf)
    )
  )
  depositEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return depositEvent
}

export function createOffMarketEvent(
  nft: Address,
  owner: Address,
  tokenId: BigInt
): OffMarket {
  let offMarketEvent = changetype<OffMarket>(newMockEvent())

  offMarketEvent.parameters = new Array()

  offMarketEvent.parameters.push(
    new ethereum.EventParam("nft", ethereum.Value.fromAddress(nft))
  )
  offMarketEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  offMarketEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return offMarketEvent
}

export function createOnMarketEvent(
  nft: Address,
  owner: Address,
  tokenId: BigInt
): OnMarket {
  let onMarketEvent = changetype<OnMarket>(newMockEvent())

  onMarketEvent.parameters = new Array()

  onMarketEvent.parameters.push(
    new ethereum.EventParam("nft", ethereum.Value.fromAddress(nft))
  )
  onMarketEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  onMarketEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return onMarketEvent
}

export function createPausedEvent(account: Address): Paused {
  let pausedEvent = changetype<Paused>(newMockEvent())

  pausedEvent.parameters = new Array()

  pausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return pausedEvent
}

export function createPreferenceUpdatedEvent(
  nft: Address,
  tokenId: BigInt,
  lowerStrikePriceGapIdx: i32,
  upperDurationIdx: i32,
  minimumStrikePrice: BigInt
): PreferenceUpdated {
  let preferenceUpdatedEvent = changetype<PreferenceUpdated>(newMockEvent())

  preferenceUpdatedEvent.parameters = new Array()

  preferenceUpdatedEvent.parameters.push(
    new ethereum.EventParam("nft", ethereum.Value.fromAddress(nft))
  )
  preferenceUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  preferenceUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "lowerStrikePriceGapIdx",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(lowerStrikePriceGapIdx))
    )
  )
  preferenceUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "upperDurationIdx",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(upperDurationIdx))
    )
  )
  preferenceUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "minimumStrikePrice",
      ethereum.Value.fromUnsignedBigInt(minimumStrikePrice)
    )
  )

  return preferenceUpdatedEvent
}

export function createPremiumReceivedEvent(
  nft: Address,
  owner: Address,
  tokenId: BigInt,
  premiumToOwner: BigInt,
  premiumToReserve: BigInt
): PremiumReceived {
  let premiumReceivedEvent = changetype<PremiumReceived>(newMockEvent())

  premiumReceivedEvent.parameters = new Array()

  premiumReceivedEvent.parameters.push(
    new ethereum.EventParam("nft", ethereum.Value.fromAddress(nft))
  )
  premiumReceivedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  premiumReceivedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  premiumReceivedEvent.parameters.push(
    new ethereum.EventParam(
      "premiumToOwner",
      ethereum.Value.fromUnsignedBigInt(premiumToOwner)
    )
  )
  premiumReceivedEvent.parameters.push(
    new ethereum.EventParam(
      "premiumToReserve",
      ethereum.Value.fromUnsignedBigInt(premiumToReserve)
    )
  )

  return premiumReceivedEvent
}

export function createUnpausedEvent(account: Address): Unpaused {
  let unpausedEvent = changetype<Unpaused>(newMockEvent())

  unpausedEvent.parameters = new Array()

  unpausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return unpausedEvent
}

export function createWithdrawEvent(
  nft: Address,
  user: Address,
  to: Address,
  tokenId: BigInt
): Withdraw {
  let withdrawEvent = changetype<Withdraw>(newMockEvent())

  withdrawEvent.parameters = new Array()

  withdrawEvent.parameters.push(
    new ethereum.EventParam("nft", ethereum.Value.fromAddress(nft))
  )
  withdrawEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  withdrawEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  withdrawEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return withdrawEvent
}

export function createWithdrawETHEvent(
  user: Address,
  to: Address,
  amount: BigInt
): WithdrawETH {
  let withdrawEthEvent = changetype<WithdrawETH>(newMockEvent())

  withdrawEthEvent.parameters = new Array()

  withdrawEthEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  withdrawEthEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  withdrawEthEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return withdrawEthEvent
}
