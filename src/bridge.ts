import { BigInt, ethereum, log, Address } from "@graphprotocol/graph-ts"
import { InboundTransferFinalized, OutboundTransferInitiated, TxToL1, TxToL2 } from '../generated/schema';
import {
  TxToL1 as TxToL1Event,
  TxToL2 as TxToL2Event,
  OutboundTransferInitiated as OutboundTransferInitiatedEvent,
  InboundTransferFinalized as InboundTransferFinalizedEvent,
} from '../generated/templates/Bridge/Bridge';

export function handleTxToL1(event: TxToL1Event): void {
  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  let entity = new TxToL1(id)
  entity.from = event.params._from.toHexString()
  entity.to = event.params._to.toHexString()
  entity.seqNum = event.params._seqNum
  entity.data = event.params._data.toHexString()
  entity.blockNumber = event.block.number
  entity.timestamp = event.block.timestamp
  entity.txHash = event.transaction.hash.toHex()
  entity.save()
}

export function handleTxToL2(event: TxToL2Event): void {
  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  let entity = new TxToL2(id)
  entity.from = event.params._from.toHexString()
  entity.to = event.params._to.toHexString()
  entity.seqNum = event.params._seqNum
  entity.data = event.params._data.toHexString()
  entity.blockNumber = event.block.number
  entity.timestamp = event.block.timestamp
  entity.txHash = event.transaction.hash.toHex()
  entity.save()
}

export function handleOutboundTransferInitiated(event: OutboundTransferInitiatedEvent): void {
  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  let entity = new OutboundTransferInitiated(id)
  entity.token = event.params.token.toHexString()
  entity.from = event.params._from.toHexString()
  entity.to = event.params._to.toHexString()
  entity.transferId = event.params._transferId
  entity.amount = event.params._amount
  entity.data = event.params._data.toHexString()
  entity.blockNumber = event.block.number
  entity.timestamp = event.block.timestamp
  entity.txHash = event.transaction.hash.toHex()
  entity.save()
}

export function handleInboundTransferFinalized(event: InboundTransferFinalizedEvent): void {
  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  let entity = new InboundTransferFinalized(id)
  entity.token = event.params.token.toHexString()
  entity.from = event.params._from.toHexString()
  entity.to = event.params._to.toHexString()
  entity.transferId = event.params._transferId
  entity.amount = event.params._amount
  entity.data = event.params._data.toHexString()
  entity.blockNumber = event.block.number
  entity.timestamp = event.block.timestamp
  entity.txHash = event.transaction.hash.toHex()
  entity.save()
}
