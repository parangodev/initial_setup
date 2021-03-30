import express  from 'express'
import { isLoggedIn, getCurrentUser } from '../utils/middlewares/tokenValidator'

const serverRoutes = express()

serverRoutes.use('/invoice', require('../components/invoice/InvoiceRouter'))
serverRoutes.use('/mercurygate', require('../components/tracking/MercuryGateRouter'))

serverRoutes.use(isLoggedIn)
serverRoutes.use(getCurrentUser)

serverRoutes.use('/tracking', require('../components/tracking/TrackingRouter'))



export default serverRoutes
