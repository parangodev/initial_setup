//-- External Packages -/
import express from "express"
import morgan from "morgan"
import cors from "cors"
import compression from "compression"
import helmet from "helmet"

//-- Internal Packages -/
import Cors from './src/config/cors'
import { notFoundHandler, wrapErrors, errorHandler } from './src/utils/middlewares/errorHandlers'

//-- Main Router -/
import mainRouter from "./src/routes/index"

//-- Inits -/
const app = express()

//-- Midlewares -/
app.use(compression())
app.use(helmet())
app.use(cors(Cors.setCorsConfig()))
app.use(morgan('dev'))
app.use(express.json({ limit: '50 mb' }))
app.use(express.urlencoded({ extended: true, limit: '50 mb', parameterLimit: 50000 }))

//Connect DB

//-- Routes -/
app.use('/', mainRouter)

//-- Not Found Handler -/
app.use(notFoundHandler)

//-- Error Handlers -/
app.use(wrapErrors)
app.use(errorHandler)

export default app
