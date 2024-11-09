import { NextFunction, Request, Response } from 'express'
import Controller from './Controller'
import { sign } from 'jsonwebtoken'
import { LoginBody, LoginValidator } from '../Request/LoginRequest'
import { log } from 'console'

export class AuthController extends Controller {
  async login(req: Request<unknown, LoginBody>, res: Response, next: NextFunction) {
    try {
      log(req.body)
      if (req.body.pass !== 'demo_credentials') throw new Error('Invalid credentials')
      const token = sign({ user: 'demo_user' }, process.env.APP_KEY!, { expiresIn: '2m' })
      res.json({ token })
    } catch (error) {
      next(error)
    }
  }

  register() {
    this.router.post('/login', [LoginValidator], this.login.bind(this))
    return this.router
  }
}
