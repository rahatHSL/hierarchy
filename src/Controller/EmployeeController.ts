import { NextFunction, Request, Response } from 'express'
import Controller from './Controller'
import { getEmployeeAction } from '../Action/GetEmployeeAction'
import { GetEmployeeParams, GetEmployeeValidator } from '../Request/GetEmployeeRequest'

export class EmployeeController extends Controller {
  async getEmployees(
    req: Request<unknown, unknown, unknown, GetEmployeeParams>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await new getEmployeeAction(req.query).execute()
      res.json(result)
    } catch (error) {
      next(error)
    }
  }

  register() {
    this.router.get('/all', [GetEmployeeValidator], this.getEmployees.bind(this))
    return this.router
  }
}
