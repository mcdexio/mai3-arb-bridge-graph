import { BigInt, ethereum, log, Address } from "@graphprotocol/graph-ts"
import { MessageDelivered } from '../generated/schema';
import {
    MessageDelivered as MessageDeliveredEvent,
} from '../generated/Delay/Delay';

export function handleMessageDelivered(event: MessageDeliveredEvent): void {
    if (event.transaction.value == BigInt.fromI32(0)) {
        return
    }
    let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString()
    let entity = new MessageDelivered(id)
    entity.messageIndex = event.params.messageIndex
    entity.beforeInboxAcc = event.params.beforeInboxAcc.toHexString()
    entity.inbox = event.params.inbox.toHexString()
    entity.kind = event.params.kind
    entity.sender = event.params.sender.toHexString()
    entity.messageDataHash = event.params.messageDataHash.toHexString()
    entity.value = event.transaction.value
    entity.blockNumber = event.block.number
    entity.timestamp = event.block.timestamp
    entity.txHash = event.transaction.hash.toHex()
    entity.save()
  }