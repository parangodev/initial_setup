export interface ITrackingActivityReport {
  id: number
  tracking_id: number
  type: string
  status_code: string
  actual_date: Date
  planned_date: Date
  latest_date: Date
  earliest_date: Date
  description: string | null
}