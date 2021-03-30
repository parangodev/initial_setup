import { Router } from 'express'
import { catchErrors } from '../../utils/middlewares/errorHandlers'
import { validateSchemaParams } from '../../utils/middlewares/validationSchema'
import TrackingController from './controllers/TrackingController'
import { getDocumentParamsSchema } from './schemas/getDocumentParamsSchema'
import { bolNumberSchema } from './schemas/bolNumberSchema'

const router: Router = Router()
const trackingController: TrackingController = new TrackingController()

router.get(
  '/document/:type/:bolNumber',
  validateSchemaParams(getDocumentParamsSchema),
  catchErrors(trackingController.getDocument)
)

router.get(
  '/:bolNumber',
  validateSchemaParams(bolNumberSchema),
  catchErrors(trackingController.getTracking)
)

module.exports = router