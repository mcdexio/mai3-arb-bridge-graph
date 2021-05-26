import { BigInt, ethereum, log, Address } from "@graphprotocol/graph-ts"
import { WithdrawToken, TokenCreated, CustomTokenRegistered, Deposit, MintAndCallTriggered, ActivateCustomToken, DeployToken, WithdrawRedirected, WithdrawExecuted } from '../generated/schema';
import {
  DepositToken,
  ActivateCustomToken as ActivateCustomTokenEvent,
  DeployToken as DeployTokenEvent,
  WithdrawRedirected as WithdrawRedirectedEvent,
  WithdrawExecuted as WithdrawExecutedEvent,
  CustomTokenRegistered as CustomTokenRegisteredEvent,
  TokenCreated as TokenCreatedEvent,
  WithdrawToken as WithdrawTokenEvent,
  MintAndCallTriggered as MintAndCallTriggeredEvent
} from '../generated/mai3-arb-bridge/Bridge';

export function handleDepositToken(event: DepositToken): void {
  let deposit= new Deposit(event.params.seqNum.toString())
  deposit.destination = event.params.destination.toHexString()
  deposit.sender = event.params.sender.toHexString()
  deposit.value = event.params.value
  deposit.tokenAddress = event.params.tokenAddress.toHexString()
  deposit.save()
}

export function handleDeployToken(event: DeployTokenEvent): void {
  let deploy = new DeployToken(event.params.seqNum.toString())
  deploy.l1Address = event.params.l1Address.toHexString()
  deploy.save()
}

export function handleActivateCustomToken(event: ActivateCustomTokenEvent): void {
  let activate = new ActivateCustomToken(event.params.seqNum.toString())
  activate.l1Address = event.params.l1Address.toHexString()
  activate.l2Address = event.params.l2Address.toHexString()
  activate.save()
}

export function handleCustomTokenRegistered(event: CustomTokenRegisteredEvent): void {
  let custom = new CustomTokenRegistered(event.params.l1Address.toHexString())
  custom.l2Address = event.params.l2Address.toHexString()
  custom.save()
}

export function handleTokenCreated(event: TokenCreatedEvent): void {
  let created = new TokenCreated(event.params.l1Address.toHexString())
  created.l2Address = event.params.l2Address.toHexString()
  created.save()
}

export function handleWithdrawRedirected(event: WithdrawRedirectedEvent): void {
  let withdraw = new WithdrawRedirected(event.params.exitNum.toString())
  withdraw.user = event.params.user.toHexString()
  withdraw.liquidityProvider = event.params.liquidityProvider.toHexString()
  withdraw.erc20 = event.params.erc20.toHexString()
  withdraw.amount = event.params.amount
  withdraw.save()
}

export function handleWithdrawExecuted(event: WithdrawExecutedEvent): void {
  let withdraw = new WithdrawExecuted(event.params.exitNum.toString())
  withdraw.initialDestination = event.params.initialDestination.toHexString()
  withdraw.destination = event.params.destination.toHexString()
  withdraw.erc20 = event.params.erc20.toHexString()
  withdraw.amount = event.params.amount
  withdraw.save()
}

export function handleWithdrawToken(event: WithdrawTokenEvent): void {
  let withdraw = new WithdrawToken(event.params.withdrawalId.toString())
  withdraw.l1Address = event.params.l1Address.toHexString()
  withdraw.destination = event.params.destination.toHexString()
  withdraw.exitNum = event.params.exitNum
  withdraw.amount = event.params.amount
  withdraw.save()
}

export function handleMintAndCallTriggered(event: MintAndCallTriggeredEvent): void {
    let mint = new MintAndCallTriggered(event.params.withdrawalId.toString())
    mint.sucess = event.params.sucess
    mint.sender = event.params.sender.toHexString()
    mint.dest = event.params.dest.toHexString()
    mint.amount = event.params.amount
    mint.save()
}