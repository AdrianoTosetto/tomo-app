import express from 'express'
import bodyParser from 'body-parser'

import { Controller } from 'controllers/controller'

export class App {
  public app: express.Application
  public port: number


  constructor(controllers, port) {
    this.app = express()
    this.port = port
    this.initializeMiddlewares()
    this.initializeControllers(controllers)
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json())
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach(controller => {
      this.app.use('/', controller.router)
    })
  }

  public listen(callback: Function) {
    this.app.listen(this.port, callback())
  }
}