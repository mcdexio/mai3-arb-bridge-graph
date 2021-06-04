import { BigInt, ethereum, log, Address } from "@graphprotocol/graph-ts"
import { WithdrawToken, Deposit, MintAndCallTriggered, L2ToL1Transaction, WithdrawRedirected, WithdrawExecuted, InboxMessageDelivered, MessageDelivered } from '../generated/schema';
import {
  DepositToken,
  WithdrawRedirected as WithdrawRedirectedEvent,
  WithdrawExecuted as WithdrawExecutedEvent,
  WithdrawToken as WithdrawTokenEvent,
  MintAndCallTriggered as MintAndCallTriggeredEvent,
  L2ToL1Transaction as L2ToL1TransactionEvent,
  InboxMessageDelivered as InboxMessageDeliveredEvent,
  MessageDelivered as MessageDeliveredEvent
} from '../generated/mai3-arb-bridge/Bridge';

export function handleDepositToken(event: DepositToken): void {
  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  let deposit= new Deposit(id)
  deposit.destination = event.params.destination.toHexString()
  deposit.sender = event.params.sender.toHexString()
  deposit.value = event.params.value
  deposit.seqNum = event.params.seqNum
  deposit.tokenAddress = event.params.tokenAddress.toHexString()
  deposit.blockNumber = event.block.number
  deposit.timestamp = event.block.timestamp
  deposit.save()
}

export function handleWithdrawRedirected(event: WithdrawRedirectedEvent): void {
  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  let withdraw = new WithdrawRedirected(id)
  withdraw.user = event.params.user.toHexString()
  withdraw.liquidityProvider = event.params.liquidityProvider.toHexString()
  withdraw.erc20 = event.params.erc20.toHexString()
  withdraw.amount = event.params.amount
  withdraw.exitNum = event.params.exitNum
  withdraw.blockNumber = event.block.number
  withdraw.timestamp = event.block.timestamp
  withdraw.save()
}

export function handleWithdrawExecuted(event: WithdrawExecutedEvent): void {
  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  let withdraw = new WithdrawExecuted(id)
  withdraw.initialDestination = event.params.initialDestination.toHexString()
  withdraw.destination = event.params.destination.toHexString()
  withdraw.erc20 = event.params.erc20.toHexString()
  withdraw.amount = event.params.amount
  withdraw.exitNum = event.params.exitNum
  withdraw.blockNumber = event.block.number
  withdraw.timestamp = event.block.timestamp
  withdraw.save()
}

export function handleWithdrawToken(event: WithdrawTokenEvent): void {
  let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  let withdraw = new WithdrawToken(id)
  withdraw.l1Address = event.params.l1Address.toHexString()
  withdraw.destination = event.params.destination.toHexString()
  withdraw.exitNum = event.params.exitNum
  withdraw.amount = event.params.amount
  withdraw.blockNumber = event.block.number
  withdraw.timestamp = event.block.timestamp
  withdraw.save()
}

export function handleMintAndCallTriggered(event: MintAndCallTriggeredEvent): void {
    let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString()
    let mint = new MintAndCallTriggered(id)
    mint.success = event.params.success
    mint.sender = event.params.sender.toHexString()
    mint.dest = event.params.dest.toHexString()
    mint.amount = event.params.amount
    mint.blockNumber = event.block.number
    mint.save()
}

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

export function handleInboxMessageDelivered(event: InboxMessageDeliveredEvent): void {
    let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString()
    let entity = new InboxMessageDelivered(id)
    entity.messageNum = event.params.messageNum
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
    entity.messageData = event.params.messageDataHash.toHexString()
    entity.save()   
}