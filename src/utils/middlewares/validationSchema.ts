import { Request, Response, NextFunction } from 'express'
import joi from '@hapi/joi'
import boom from '@hapi/boom'

/**
 * Aux function to validate the schema data with the incoming request data
 * @param incomingData data on the request
 * @param schema Schema that will be validated
 */
function joiValidation (incomingData: any, schema:joi.ObjectSchema){
  const { error } = schema.validate(incomingData)
  return error
}

/**
 * Allows to validate the request structure on body request property
 * with an specific schema
 * @param schema 
 */
export function validateSchemaBody (schema:joi.ObjectSchema) {
  return function (req:Request, res:Response, next:NextFunction) {
    const error = joiValidation(req.body, schema)
    
    if (error) {
      res.status(boom.badRequest().output.statusCode).json({ message: error.message })
    } else {
      next()
    }
  }
}

/**
 * Allows to validate the request structure on params request property
 * with an specific schema
 * @param schema 
 */
export function validateSchemaParams (schema:joi.ObjectSchema) {
  return function (req:Request, res:Response, next:NextFunction) {
    const error = joiValidation(req.params, schema)

    if (error) {
      throw boom.badRequest(error.message)
    } else {
      next()
    }
  }
}

/**
 * Allows to validate the request structure on query request property
 * with an specific schema
 * @param schema 
 */
export function validateSchemaQuery (schema:joi.ObjectSchema) {
  return function (req:Request, res:Response, next:NextFunction) {
    const error = joiValidation(req.query, schema)
    
    if (error) {
      throw boom.badRequest(error.message)
    } else {
      next()
    }
  }
}

/**
 * Allows to validate the request structure on headers request property
 * with an specific schema
 * @param schema 
 */
export function validateSchemaHeaders (schema:joi.ObjectSchema) {
  return function (req:Request, res:Response, next:NextFunction) {
    const error = joiValidation(req.headers, schema)

    if (error) {
      throw boom.badRequest(error.message)
    } else {
      next()
    }
  }
}

/**
 * Allows to validate the request structure on file request property
 * with an specific schema
 * @param schema 
 */
export function validateSchemaFile (schema:joi.ObjectSchema) {
  return function (req:Request, res:Response, next:NextFunction) {
    const error = joiValidation(req.file, schema)

    if (error) {
      throw boom.badRequest(error.message)
    } else {
      next()
    }
  }
}

/**
 * Allows to validate an object with a specific schema
 * @param schema
 */
export function validateObject (object:any, schema:joi.ObjectSchema) {
  const error = joiValidation(object, schema)

  if (error) return error.message
  return null
}