import { NextFunction, Request, Response } from 'express'
import { ValidationChain, validationResult } from 'express-validator'

interface ValidationMessageBag {
  [key: string]: string
}

export const ValidatorMiddleware = (rules: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(rules.map(rule => rule.run(req)))

    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }

    const messageBag = errors.array().reduce((acc: ValidationMessageBag, e) => {
      acc[e.param] = e.msg
      return acc
    }, {} as ValidationMessageBag)

    res.status(422).json({
      ...messageBag,
      message: 'Validation Error',
    })
  }
}
