export interface ITrackingActivityDto {
  tracking_id: number
  type: string | null
  status_code: string
  actual_date: Date | null
  planned_date: Date | null
  latest_date: Date | null
  earliest_date: Date | null
}