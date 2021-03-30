import envVars from './config'
import * as cors from 'cors'

class Cors {
    static setCorsConfig():any {
        const corsOptions: cors.CorsOptions = {
            allowedHeaders: [
                'Origin',
                'X-Requested-With',
                'Content-Type',
                'Accept',
                'X-Access-Token',
                'Authorization',
                'Access-Control-Allow-Origin',
                'Access-Control-Allow-Credentials',
                'x-company-id'
            ],
            credentials: true,
            methods: '*',
            origin: envVars.CORS,
            preflightContinue: false
        }
    
        return corsOptions
    }
}

export default Cors