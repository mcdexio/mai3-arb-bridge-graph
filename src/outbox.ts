import { BigInt, ethereum, log, Address } from "@graphprotocol/graph-ts"
import { OutBoxTransaction } from '../generated/schema';
import {
    OutboxEntryCreated as OutboxEntryCreatedEvent,
    OutBoxTransactionExecuted as OutBoxTransactionExecutedEvent,
} from '../generated/Delay/Delay';

export function OutboxEntryCreated(event: OutboxEntryCreatedEvent): void {
    let id = event.address.toHex() + "-" + event.params.outboxIndex.toString()
    let entity = new OutBoxTransaction(id)
    entity.batchNum = event.params.batchNum
    entity.outboxIndex = event.params.outboxIndex
    entity.outputRoot = event.params.outputRoot.toHexString()
    entity.numInBatch = event.params.numInBatch
    entity.destAddr = ""
    entity.l2Sender = ""
    entity.transactionIndex = BigInt.fromI32(0)
    entity.withdrawBlock = event.block.number
    entity.executedBlock = BigInt.fromI32(0)
    entity.executedTxHash = ""
    entity.executedTimestamp = BigInt.fromI32(0)
    entity.save()
}

export function handleOutBoxTransactionExecuted(event: OutboxEntryCreatedEvent): void {
    let id = event.address.toHex() + "-" + event.params.outboxIndex.toString()
    let entity = OutBoxTransaction.load(id)
    if (entity === null) {
        return
    }
    entity.destAddr = event.params.destAddr.toHexString()
    entity.l2Sender = event.params.l2Sender.toHexString()
    entity.transactionIndex = event.params.transactionIndex
    entity.executedBlock = event.block.number
    entity.executedTxHash = event.transaction.hash.toHex()
    entity.executedTimestamp = event.block.timestamp
    entity.save()
}
