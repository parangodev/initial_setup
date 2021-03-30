import { Router } from 'express'
import bodyParser from 'body-parser'
import TrackingController from './controllers/TrackingController'
import { catchErrors } from '../../utils/middlewares/errorHandlers'
import { parseRequest } from '../../utils/middlewares/bodyParser'
import { filterRequest } from '../../utils/middlewares/bodyFilter'
import { mercuryGateFilterSchema } from './schemas/mercuryGateFilterSchema'
import { validateSchemaBody } from '../../utils/middlewares/validationSchema'
import { mercuryGateTrackingDataSchema } from './schemas/mercuryGateTrackingDataSchema'

const router: Router = Router()
const trackingController: TrackingController = new TrackingController()

router.post(
  '/',
  bodyParser.text({ type: '*/xml', limit:"500kb" }),
  parseRequest(),
  filterRequest(mercuryGateFilterSchema),
  validateSchemaBody(mercuryGateTrackingDataSchema),
  catchErrors(trackingController.createMercuryGateTracking)
)

module.exports = router