import { Request, Response, NextFunction } from 'express'
import Jwt from 'express-jwt'
import jwksRsa from 'jwks-rsa'
import boom from '@hapi/boom'
import axios from 'axios'
import envVars from '../../config/config'
import restrictionsConfig from '../../config/restrictionsConfig'

export const isLoggedIn = Jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 10,
    jwksUri: `${envVars.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),
  audience: envVars.AUTH0_AUDIENCE,
  issuer: `${envVars.AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
})

export const getCurrentUser = async (req:Request|any, res:Response, next:NextFunction) => {
  try {
    const noRestrictedPath = restrictionsConfig.urlsNoRestricted.find(noRestricted => {
      if (noRestricted.path === req.url && noRestricted.method === req.method) {
        return noRestricted
      }
    })

    if (!noRestrictedPath) {
      if (!req.headers['x-company-id']) throw boom.unauthorized('x-company-id header is required for this request')
    }
    
    if (!req.user || !req.user.sub) throw boom.unauthorized('Not valid auth0 id')
    const axiosResponse = await axios.get(`${envVars.LTL_USER_URL}/user`, {
      headers: {
        authorization: req.headers.authorization,
        'X-Company-Id': req.headers['x-company-id']
      }
    })
    if(axiosResponse.status !== 200) throw boom.badRequest('Something went wrong validating the user')
    const currentUser = axiosResponse.data.data
    if (!currentUser) throw boom.unauthorized('Not valid user')
    res.locals = { ...currentUser }
    next()   
  } catch (error) {
    next(error)
  }
}