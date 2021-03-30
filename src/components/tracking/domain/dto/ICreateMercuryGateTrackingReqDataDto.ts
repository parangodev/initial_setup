import { ICreateMercuryGateTrackingDto } from "./ICreateMercuryGateTrackingDto"

export interface ICreateMercuryGateTrackingReqDataDto {
  userId: number,
  parentId: number | null,
  tracking: ICreateMercuryGateTrackingDto,
}