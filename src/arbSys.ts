import { BigInt, ethereum, log, Address } from "@graphprotocol/graph-ts"
import { L2ToL1Transaction } from '../generated/schema';
import {
    L2ToL1Transaction as L2ToL1TransactionEvent,
} from '../generated/arb-sys/ArbSys';

export function handleL2ToL1Transaction(event: L2ToL1TransactionEvent): void {
    let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString()
    let transaction = new L2ToL1Transaction(id)
    transaction.caller = event.params.caller.toHexString()
    transaction.destination = event.params.destination.toHexString()
    transaction.uniqueId = event.params.uniqueId
    transaction.batchNumber = event.params.batchNumber
    transaction.indexInBatch = event.params.indexInBatch
    transaction.arbBlockNum = event.params.arbBlockNum
    transaction.ethBlockNum = event.params.ethBlockNum
    transaction.timestamp = event.params.timestamp
    transaction.callvalue = event.params.callvalue
    transaction.data = event.params.data.toHexString()
    transaction.save()
}
