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
  entity.gateway = event.address.toHexString()
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
  entity.gateway = event.address.toHexString()
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
  entity.gateway = event.address.toHexString()
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

  // from OutboundTransferInitiated with the same transaferId/uniqueId
  let l2TransactionId = event.transaction.hash.toHex() + "-" + event.params._transferId.toString()
  let l2Transaction = OutboundTransferInitiated.load(l2TransactionId)
  if (l2Transaction === null) {
    return
  }
  l2Transaction.token = event.params.token.toHexString()
  l2Transaction.from = event.params._from.toHexString()
  l2Transaction.to = event.params._to.toHexString()
  l2Transaction.amount = event.params._amount
  l2Transaction.save()
}

export function handleInboundTransferFinalized(event: InboundTransferFinalizedEvent): void {
  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  let entity = new InboundTransferFinalized(id)
  entity.gateway = event.address.toHexString()
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
