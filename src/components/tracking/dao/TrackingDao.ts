import TrackingModel from '../models/TrackingModel'
import TrackingActivityModel from '../models/TrackingActivityModel'
import { ITrackingReport } from '../domain/report/ITrackingReport'
import { ITrackingDto } from '../domain/dto/ITrackingDto'
import { ITrackingActivityDto } from '../domain/dto/ITrackingActivityDto'
import { ITrackingAndActivitiesReport } from '../domain/report/ITrackingAndActivitiesReport'

export default class TrackingDao {

  async saveMercuryGateTracking (trackingDto: ITrackingDto): Promise<ITrackingReport> {
    const tracking: ITrackingReport = await (await TrackingModel.create(trackingDto)).get()
    return tracking
  }

  async saveTrackingActivity (trackingActivityDto: ITrackingActivityDto): Promise<ITrackingReport | null> {
    const { tracking_id, status_code, actual_date } = trackingActivityDto
    const trackingActivityModel = await TrackingActivityModel.findOne({ where: { tracking_id, status_code, actual_date } })
    if(!trackingActivityModel) {
      const savedTrackingActivity = await ( await TrackingActivityModel.create(trackingActivityDto)).get()
      return savedTrackingActivity
    }
    return null
  }

  async getTrackingByBOLNumber (bol_number: string): Promise<ITrackingReport | null> {
    const tracking = await TrackingModel.findOne({ where: { bol_number } })
    return tracking?.get({ plain: true })
  }

  async getTrackingAndActivitiesByBOLNumber(bol_number: string): Promise<ITrackingAndActivitiesReport | null> {
    const tracking = await TrackingModel.findOne({
      where: { bol_number },
      include: { model: TrackingActivityModel, as: 'activities' }
    })
    return await tracking?.get({ plain: true })
  }

}