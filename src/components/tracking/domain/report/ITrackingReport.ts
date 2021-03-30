export interface ITrackingReport {
  id: number
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
  signed_bol: string
  delivery_receipt: string
  weight_ticket: string
}