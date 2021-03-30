import boom from '@hapi/boom'
import axios from 'axios'
import TrackingDao from '../dao/TrackingDao'

import { ICreateMercuryGateTrackingReqDataDto } from '../domain/dto/ICreateMercuryGateTrackingReqDataDto'
import { storeFileInS3Bucket, getFileStoredInS3Bucket } from '../../../utils/S3'
import { FilesDataDto } from '../domain/dto/IFilesDataDto'
import { IFileDto } from '../domain/dto/IFileDto'
import { ITrackingDto } from '../domain/dto/ITrackingDto'
import { DocumentTypesEnum } from '../../../enums/DocumentTypesEnum'
import { ICreateMercuryGateTrackingDto } from '../domain/dto/ICreateMercuryGateTrackingDto'
import { ITrackingReport } from '../domain/report/ITrackingReport'
import { IEventsDto } from '../domain/dto/IEventsDto'
import { ITrackingActivityDto } from '../domain/dto/ITrackingActivityDto'
import * as _ from 'underscore'
import { getTrackingCodeDescription } from '../../../utils/TrackingCodes'
import { ITrackingMessagesDto } from '../domain/dto/ITrackingMessagesDto'

const trackingDao: TrackingDao = new TrackingDao()

export default class TrackingService {

  async saveMercuryGateTracking (reqData: ICreateMercuryGateTrackingReqDataDto): Promise<ITrackingReport> {
    const { tracking } = reqData
    const bolNumber = tracking.bol_number
    const trackingData = await trackingDao.getTrackingByBOLNumber(bolNumber)
    if(!trackingData) {
      const trackingDto = this.generateTrackingDto(tracking)
      const trackingReport = await trackingDao.saveMercuryGateTracking(trackingDto)
      const trackingActivities = this.processEvents(tracking.events, tracking.trackingMessages, trackingReport.id)
      this.saveTrackingActivities(trackingActivities)
      const filesData: FilesDataDto[] = [
        { fileType: DocumentTypesEnum.BOL, fileUrl: trackingDto.signed_bol },
        { fileType: DocumentTypesEnum.DELIVERY_RECEIPT, fileUrl: trackingDto.delivery_receipt },
        { fileType: DocumentTypesEnum.SCALE_AR, fileUrl: trackingDto.weight_ticket },
      ]
      this.storeFiles(filesData, bolNumber)
      return trackingReport
    } else {
      const trackingActivities = this.processEvents(tracking.events, tracking.trackingMessages, trackingData.id)
      this.saveTrackingActivities(trackingActivities)
      return trackingData
    }
  }

  async getDocumentByBolNumberAndType(type: string, bolNumber: string): Promise<IFileDto> {
    const tracking = await trackingDao.getTrackingByBOLNumber(bolNumber)
    if(!tracking) throw boom.notFound(`There is no tracking information for BOL number: ${bolNumber}`)
    const pdfName = `${bolNumber}-${type}`
    const pdf = await getFileStoredInS3Bucket(pdfName)
    if(!pdf) throw boom.notFound(`Document of type ${type} could not be found for BOL number: ${bolNumber}`)
    return { pdf, pdfName }
  }

  async getTrackingByBolNumber(bolNumber: string): Promise<any> {
    const tracking = await trackingDao.getTrackingAndActivitiesByBOLNumber(bolNumber)
    if (!tracking) throw boom.notFound(`Tracking data for shipment with BOL number: ${bolNumber} was not found`)
    const { activities } = tracking
    if (!_.isEmpty(activities)) {
      activities.map( activity => {
        const statusCode = activity.status_code
        const description = getTrackingCodeDescription(statusCode)
        activity.description = description
      })
    }
    return tracking
  }

  private async storeFiles(filesData: FilesDataDto[], bolNumber: string): Promise<void> {
    for ( const fileData of filesData ) {
      const fileName = `${bolNumber}-${fileData.fileType}`
      if(fileData.fileUrl) {
        const file = await this.downloadFile(fileData.fileUrl)
        if(file) await storeFileInS3Bucket(file, fileName) 
      }
    }
  }

  private async downloadFile(fileURL: string): Promise<Buffer | null> {
    try {
      const response = await axios.get(fileURL, { responseType: 'arraybuffer' })
      if(response.status !== 200) return null
      return response.data
    } catch (e) {
      return null
    }
  }

  private generateTrackingDto(tracking: ICreateMercuryGateTrackingDto): ITrackingDto {
    const links = tracking.links
    const signedBolLink = links.find(link => (link.type === DocumentTypesEnum.BOL && link.url.includes('api.hubtran.com')))
    const deliveryReceiptLink = links.find(link => (link.type === 'DELIVERY RECEIPT' && link.url.includes('api.hubtran.com')))
    const weightTicket = links.find(link => (link.type === DocumentTypesEnum.SCALE_AR && link.url.includes('api.hubtran.com')))
    const trackinDto: ITrackingDto = {
      bol_number: tracking.bol_number,
      customer_rate_total: tracking.customer_rate_total || null,
      customer_scac: tracking.customer_scac || null,
      scac: tracking.scac || null,
      carrier_pickup_number: tracking.carrier_pickup_number || null,
      customer_acct_number: tracking.customer_acct_number || null,
      special_instructions: tracking.special_instructions || null,
      carrier_id: tracking.carrier_id || null,
      carrier_name: tracking.carrier_name || null,
      mode: tracking.mode || null,
      service_days: tracking.service_days || null,
      distance: tracking.distance || null,
      status: tracking.status || null,
      owner: tracking.owner || null,
      signed_bol: signedBolLink?.url || null,
      delivery_receipt: deliveryReceiptLink?.url || null,
      weight_ticket: weightTicket?.url || null
    }
    return trackinDto
  }

  private processEvents(events: IEventsDto[], trackingMessages: ITrackingMessagesDto[], trackingId: number): ITrackingActivityDto[] {
    const trackingActivities: ITrackingActivityDto[] = []
    for ( const event of events ) {
      const shipmentStatus = event.trackingMessages[0].shipmentStatus
      for ( const status of shipmentStatus ) {
        const trackingActivity: ITrackingActivityDto = {
          tracking_id: trackingId,
          type: status.statusDetails[0].type,
          status_code: status.statusDetails[0].code,
          actual_date: status.statusDetails[0].actual || null,
          planned_date: status.statusDetails[0].planned || null,
          latest_date: status.statusDetails[0].latest || null,
          earliest_date: status.statusDetails[0].earliest || null
        }
        trackingActivities.push(trackingActivity)
      }
    }
    for ( const message of trackingMessages ) {
      const trackingActivity: ITrackingActivityDto = {
        tracking_id: trackingId,
        type: null,
        status_code: message.code,
        actual_date: message.actual || null,
        planned_date: null,
        latest_date: null,
        earliest_date: null
      }
      trackingActivities.push(trackingActivity)
    }
    return trackingActivities
  }

  private async saveTrackingActivities(trackingActivities: ITrackingActivityDto[]): Promise<void> {
    for ( const activity of trackingActivities ) {
      await trackingDao.saveTrackingActivity(activity)
    }
  }

}