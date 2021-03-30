export interface IAuditDataDto {
  documentType: string
  documentId: number
  timestamp: number
  userId: number
  companyId: number
  message: string
  data: any
}