import { query } from 'express-validator'
import { ValidatorMiddleware } from '../middleware/ValidatorMiddleware'

export const GetEmployeeValidator = ValidatorMiddleware([
  query('id').isInt().toInt().withMessage('id must be an integer'),
])

export interface GetEmployeeParams {
  id: number
}
