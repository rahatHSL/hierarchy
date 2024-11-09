import express, { NextFunction, Request, Response } from 'express'
import bodyParser from 'body-parser'
import { AppError, handleError } from '../server/Exception'
import { EmployeeController } from '../Controller/EmployeeController'

const app = express()
app.use(bodyParser.json()) // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })) // to support URL-encoded bodies

app.use('/employee', new EmployeeController().register())

app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  handleError(err, res)
})

export const HttpServer = app
