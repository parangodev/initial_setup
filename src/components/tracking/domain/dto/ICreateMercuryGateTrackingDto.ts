import { IEventsDto } from "./IEventsDto";
import { ILinksDto } from "./ILinksDto";
import { ITrackingMessagesDto } from "./ITrackingMessagesDto";

export interface ICreateMercuryGateTrackingDto {
  bol_number: string
  customer_rate_total: number
  customer_scac: string
  scac: string
  carrier_pickup_number: string
  customer_acct_number: string
  special_instructions: string
  carrier_id: string
  carrier_name: string
  mode: string
  service_days: number
  distance: number
  status: string
  owner: string
  links: ILinksDto[]
  events: IEventsDto[]
  trackingMessages: ITrackingMessagesDto[]
}