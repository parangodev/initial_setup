import { ObjectSchema, object, string, number, array, date } from '@hapi/joi'

export const mercuryGateTrackingDataSchema: ObjectSchema = object({
  bol_number: string().trim().min(1).required(),
  customer_rate_total: number().positive().allow(0),
  customer_scac: string().trim().min(1),
  scac: string().trim().min(1),
  carrier_pickup_number: string().trim().min(1),
  customer_acct_number: string().trim().min(1),
  special_instructions: string().trim().min(1),
  carrier_id: string().trim().min(1),
  carrier_name: string().trim().min(1),
  mode: string().trim().min(1),
  service_days: number().positive().integer(),
  distance: number(),
  status: string().trim().min(1),
  owner: string().trim().min(1),
  links:  array().items(object().keys({
    type: string(),
    url: string()
  })),
  events: array().items(object().keys({
    trackingMessages: array().items(object().keys({
      shipmentStatus: array().items(object().keys({
        statusDetails: array().items(object().keys({
          code: string(),
          type: string(),
          actual: date(),
          earliest: date(),
          latest: date(),
          planned: date(),
        }))
      }))
    }))
  })),
  trackingMessages: array().items(object().keys({
    code: string(),
    actual: date(),
  }))
})
