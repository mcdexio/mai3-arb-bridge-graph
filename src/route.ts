import { BigInt, ethereum, log, Address } from "@graphprotocol/graph-ts"
import { Gateway, DefaultGateway } from '../generated/schema';
import {
  GatewaySet as GatewaySetEvent,
  DefaultGatewayUpdated as DefaultGatewayUpdatedEvent,
} from '../generated/mai3-arb-bridge/Route';

import { 
    Bridge as BridgeTemplate,
} from '../generated/templates'

export function handleGatewaySet(event: GatewaySetEvent): void {
  let id = event.params.gateway.toHexString()
  let entity = Gateway.load(id)
  if (entity === null) {
    entity = new Gateway(id)
    entity.tokens = []
    BridgeTemplate.create(event.params.gateway)
  }
  let tokens = entity.tokens
  tokens.push(event.params.l1Token.toHexString())
  entity.tokens = tokens
  entity.blockNumber = event.block.number
  entity.timestamp = event.block.timestamp
  entity.txHash = event.transaction.hash.toHex()
  entity.save()
}

export function handleDefaultGatewayUpdated(event: DefaultGatewayUpdatedEvent): void {
  let id = '1'
  let gatewayID = event.params.newDefaultGateway.toHexString()
  let entity = new DefaultGateway(id)
  let gatway = Gateway.load(gatewayID)
  if (gatway === null) {
    gatway = new Gateway(gatewayID)
    gatway.tokens = []
    gatway.blockNumber = event.block.number
    gatway.timestamp = event.block.timestamp
    gatway.txHash = event.transaction.hash.toHex()
    gatway.save()
    BridgeTemplate.create(event.params.newDefaultGateway)
  }

  entity.gateway = gatewayID
  entity.blockNumber = event.block.number
  entity.timestamp = event.block.timestamp
  entity.txHash = event.transaction.hash.toHex()
  entity.save()
}
