import { BigInt, ethereum, log, Address } from "@graphprotocol/graph-ts"
import { InboxMessageDelivered, MessageDelivered } from '../generated/schema';
import {
    InboxMessageDelivered as InboxMessageDeliveredEvent,
    MessageDelivered as MessageDeliveredEvent,
} from '../generated/Inbox/Inbox';

export function handleInboxMessageDelivered(event: InboxMessageDeliveredEvent): void {
    let id = event.transaction.hash.toHex() + "-" + event.params.uniqueId.toString()
    let entity = new InboxMessageDelivered(id)
    entity.messageNum = event.params.messageNum.toHexString()
    // let decoded = ethereum.decode("(address,(address,bool))", event.params.data).toTuple();
    entity.data = event.params.data.toHexString()
    entity.save()
}

export function handleMessageDelivered(event: MessageDeliveredEvent): void {
    let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString()
    let entity = new MessageDelivered(id)
    entity.messageIndex = event.params.messageIndex
    entity.beforeInboxAcc = event.params.beforeInboxAcc.toHexString()
    entity.inbox = event.params.inbox.toHexString()
    entity.kind = event.params.kind
    entity.sender = event.params.sender.toHexString()
    entity.messageDataHash = event.params.messageDataHash.toHexString()
    entity.value = event.transaction.value
    entity.save()
  }