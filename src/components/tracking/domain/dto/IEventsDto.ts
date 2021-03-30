import { IShipmentStatusDto } from "./IShipmentStatusDto"

export interface IEventsDto {
  trackingMessages: IShipmentStatusDto[]
}