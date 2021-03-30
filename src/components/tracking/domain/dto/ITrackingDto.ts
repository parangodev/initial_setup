export interface ITrackingDto {
  bol_number: string
  customer_rate_total: number | null
  customer_scac: string | null
  scac: string | null
  carrier_pickup_number: string | null
  customer_acct_number: string | null
  special_instructions: string | null
  carrier_id: string | null
  carrier_name: string | null
  mode: string | null
  service_days: number | null
  distance: number | null
  status: string | null
  owner: string | null
  signed_bol: string | null
  delivery_receipt: string | null
  weight_ticket: string | null
}