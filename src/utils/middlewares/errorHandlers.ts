import { Request, Response, NextFunction } from 'express'
import boom from '@hapi/boom'

/**
 * This function will help handled all each function that return promises. This function will
 * be used to wrap the controller functions.
 * @param fn function that return a promise
 */
function catchErrors (fn: Function) {
    return (req: Request, res: Response, next: NextFunction) => {
      return fn(req, res, next).catch(next)
    }
}

/**
 * Allow us to handled the error structure and the information that will be returned in case
 * of error. If the NODE_ENV value is different to 'production', we will return the error and the
 * error stack. If it is 'production', will be returned just the error information.
 * @param err
 * @param stack
 */
function withErrorStack (err: object, stack: object) {
    if (process.env.NODE_ENV !== 'production') {
        return { err, stack }
    }

    return err
}

/**
 * Help to handled all this kind of routes that are not defined. This handler will return
 * an 404 Not Found error in the response.
 * @param req
 * @param res
 */
function notFoundHandler (req: Request, res: Response) {
    const {
        output: { statusCode, payload }
    } = boom.notFound()

    res.status(statusCode).json(payload)
}

/**
 * Allow to format all errors using @hapi/boom library error format. If the is and error
 * that not is an boom type error, will be wrapped as bad implementation error.
 * @param err
 * @param req
 * @param res
 * @param next
 */
function wrapErrors (err: any, req: Request, res: Response, next: NextFunction) {
    !err.isBoom
        ? err.isAxiosError
            ? next({
                output: {
                    statusCode: err.response.status ? err.response.status : 500,
                    payload: {
                        statusCode: err.response.status ? err.response.status : 500,
                        error: err.response.statusText ? err.response.statusText : 'Internal Error',
                        message: err.response.data.message ? `${err.response.data.message} | ${err.response.data.errorCode}` : 'Internal Server Error. Please contact support'
                    },
                    headers: {}
                },
                stack: err.stack ? err.stack : ''
            }) :
            err.code === 'invalid_token'
                ? next({
                    output: {
                        statusCode: err.status ? err.status : 500,
                        payload: {
                            statusCode: err.status ? err.status : 500,
                            error: err.code ? err.code : 'Internal Error',
                            message: err.message ? `${err.message} | ${err.code}` : 'Internal Server Error. Please contact support'
                        },
                        headers: {}
                    },
                    stack: err.stack ? err.stack : ''
                }) :
            err.name && err.name === 'SequelizeDatabaseError'
                ? next({
                    output: {
                        statusCode: 500,
                        payload: {
                            statusCode: 500,
                            error: err.original.routine ? `${err.original.routine} | ${err.name}` : err.name,
                            message: err.message ? err.message : 'Internal Server Error. Please contact support'
                        },
                        headers: {}
                    },
                    stack: err.stack ? err.stack : ''
                }) :
            err.status && err.message && err.code
                ? next({
                    output: {
                        statusCode: err.status,
                        payload: {
                            statusCode: err.status,
                            error: err.name ? err.name : err.code,
                            message: err.message ? err.message : 'Internal Server Error. Please contact support'
                        },
                        headers: {}
                    },
                    stack: err.stack ? err.stack : ''
                }) :
            err.name && err.name === 'MulterError'
                ? next({
                    output: {
                        statusCode: 400,
                        payload: {
                            statusCode: 400,
                            error: err.name ? err.name : err.code,
                            message: err.message ? err.message : 'Internal Server Error. Please contact support'
                        },
                        headers: {}
                    },
                    stack: err.stack ? err.stack : ''
                }) :
                next(boom.badImplementation('Internal Server Error. Please contact'))
    : next(err)
}

/**
 * Handled the outcome of the response in case of error in the request. Check if the response
 * must include the error stack.
 * @param err
 * @param req
 * @param res
 * @param next
 */
function errorHandler (err: any, req: Request, res: Response, next: NextFunction) {
    const { output: { statusCode, payload } } = err

    res.status(statusCode).json(withErrorStack({ ...payload, data: err.data || null }, err.stack))
}

export {
    notFoundHandler,
    catchErrors,
    wrapErrors,
    errorHandler
}
