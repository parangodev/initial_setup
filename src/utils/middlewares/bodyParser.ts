import { Request, Response, NextFunction } from 'express'
import { objectToXML, xmlToObject } from '../XmlConverter'

function parseRequest() {
  return async (req: Request, res: Response, next: NextFunction) => {
    req.body = await xmlToObject(req.body)
    next()
  }
}

function parseResponse(statusCode: number, xml: object) {
  return (req: Request, res: Response, next: NextFunction) => {
    next()
  }
}

function sendXML(res: Response, statusCode: number, xml: object) {
  res.set('Content-Type', 'text/xml')
  return res.status(statusCode).send(objectToXML(xml))
}

export { parseRequest, sendXML }
