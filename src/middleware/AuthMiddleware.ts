import _ from 'lodash'
import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import { log } from 'console'

const isExcludedFromAuth = (path: string) => {
  const excludedPaths = ['/auth/login']
  return excludedPaths.includes(path)
}

export const jwtAuth = (req: Request, res: Response, next: NextFunction) => {
  // log('request path:: ', req.path)
  if (isExcludedFromAuth(req.path)) {
    next()
  } else {
    try {
      let token: string | null = null
      const authorizationHeader =
        req.headers && 'Authorization' in req.headers ? 'Authorization' : 'authorization'
      // log('inside auth routes')
      if (req.headers && req.headers[authorizationHeader]) {
        // log('authorization header found')
        const parts = (req.headers[authorizationHeader] as string).split(' ')
        if (parts.length == 2) {
          const scheme = parts[0]
          const credentials = parts[1]

          if (/^Bearer$/i.test(scheme)) {
            token = credentials
          }
        }
      }

      if (!token) {
        // log('authorization header missing')
        throw new UnauthorizedError('credentials_bad_scheme', {
          message: 'Format is Authorization: Bearer [token]',
        })
      }

      let decodedToken: jwt.Jwt | null
      try {
        decodedToken = jwt.decode(token, { complete: true })
      } catch (err: any) {
        throw new UnauthorizedError('invalid_token', err)
      }

      if (!decodedToken) {
        throw new UnauthorizedError('invalid_token', { message: 'decoded token is null' })
      }

      try {
        jwt.verify(token, process.env.APP_KEY!, { algorithms: ['HS256'] })
      } catch (err: any) {
        throw new UnauthorizedError('invalid_token', err)
      }

      _.set(req, 'auth', decodedToken.payload)
      next()
    } catch (error: any) {
      log('error in jwt middleware', error)
      next(error)
    }
  }
}

export type ErrorLike = Error | { message: string }

type ErrorCode =
  | 'credentials_bad_scheme'
  | 'credentials_bad_format'
  | 'credentials_required'
  | 'invalid_token'
  | 'revoked_token'

export class UnauthorizedError extends Error {
  readonly status: number
  readonly inner: ErrorLike
  readonly code: string

  constructor(code: ErrorCode, error: ErrorLike) {
    super(error.message)
    Object.setPrototypeOf(this, UnauthorizedError.prototype)
    this.code = code
    this.status = 401
    this.name = 'UnauthorizedError'
    this.inner = error
  }
}
