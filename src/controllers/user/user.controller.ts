import express from 'express'

import { Controller } from './controller'

export class UserController implements Controller {
  path: string = '/user';
  router: express.Router = express.Router();


  constructor() {
    this.router.get(this.path, (req: express.Request, res: express.Response) => {
      res.send(`Hello from route ${this.path}`)
    })
  }
}
