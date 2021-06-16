import { BigInt, ethereum, log, Address } from "@graphprotocol/graph-ts"
import { Gateway, DefaultGateway } from '../generated/schema';
import {
  GatewaySet as GatewaySetEvent,
  DefaultGatewayUpdated as DefaultGatewayUpdatedEvent,
} from '../generated/templates/Bridge';

import { 
    Bridge as BridgeTemplate,
} from '../generated/templates'

export function handleGatewaySet(event: GatewaySetEvent): void {
  let id = event.params.gateway.toHexString()
  let entity = Gateway.load(id)
  if (entity === null) {
    entity = new Gateway(id)
    BridgeTemplate.create(event.params.gateway)
  }
  entity.token = event.params.l1Token.toHexString()
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
    gatway.token = ''
    gatway.blockNumber = event.block.number
    gatway.timestamp = event.block.timestamp
    gatway.txHash = event.transaction.hash.toHex()
    gatway.save()
    BridgeTemplate.create(event.params.gateway)
  }

  entity.gateway = gatewayID
  entity.blockNumber = event.block.number
  entity.timestamp = event.block.timestamp
  entity.txHash = event.transaction.hash.toHex()
  entity.save()
}
