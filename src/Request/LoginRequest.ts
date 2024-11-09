import { body } from 'express-validator'
import { ValidatorMiddleware } from '../middleware/ValidatorMiddleware'

export const LoginValidator = ValidatorMiddleware([
  body('pass').isString().isLength({ min: 1 }).trim().withMessage('pass must be a string'),
])

export interface LoginBody {
  pass: number
}
