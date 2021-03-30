import { Request, Response } from 'express'
import TrackingService from '../services/TrackingService'
import { HttpStatusCodesEnum } from '../../../enums/HttpStatusCodesEnum'
import { HttpStatusMessagesEnum } from '../../../enums/HttpStatusMessagesEnum'
import IResponse from '../../../utils/interfaces/Response'
import { ICreateMercuryGateTrackingReqDataDto } from '../domain/dto/ICreateMercuryGateTrackingReqDataDto'
import { sendXML } from '../../../utils/middlewares/bodyParser'
import { ICreateMercuryGateTrackingDto } from '../domain/dto/ICreateMercuryGateTrackingDto'
import { ITrackingActivityReport } from '../domain/report/ITrackingActivityReport'

const trackingService: TrackingService = new TrackingService()

export default class TrackingController {

  async createMercuryGateTracking(req: Request, res: Response): Promise<Response> {
    const userId = parseInt(res.locals.id, 10)
    const parentId = req.headers['x-company-id'] ? parseInt(req.headers['x-company-id']!.toString()) : null
    const tracking: ICreateMercuryGateTrackingDto = req.body
    const reqData: ICreateMercuryGateTrackingReqDataDto = { userId, parentId, tracking }
    const mercuryGateTrackingId = await trackingService.saveMercuryGateTracking(reqData)
    const response: IResponse = {
      status: HttpStatusCodesEnum.OK,
      message: HttpStatusMessagesEnum.OK,
      data: {
        mercuryGateTrackingId
      }
    }
    return sendXML(res, HttpStatusCodesEnum.OK, response)
  }

  async getDocument(req: Request, res: Response): Promise<Response> {
    const type = req.params.type
    const bolNumber = req.params.bolNumber
    const { pdf, pdfName } = await trackingService.getDocumentByBolNumberAndType(type, bolNumber)
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `attachment; filename=${pdfName}.pdf`)
    return res.status(HttpStatusCodesEnum.OK).send(pdf)
  }

  async getTracking(req: Request, res: Response): Promise<Response> {
    const bolNumber = req.params.bolNumber
    const serviceResponse = await trackingService.getTrackingByBolNumber(bolNumber)
    const response: IResponse = {
      status: HttpStatusCodesEnum.OK,
      message: HttpStatusMessagesEnum.OK,
      data: {
        tracking: serviceResponse
      }
    }
    return res.status(HttpStatusCodesEnum.OK).json(response)
  }

}