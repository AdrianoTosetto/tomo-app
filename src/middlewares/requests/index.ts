import express, { Request, Response } from 'express'

const requestLogger = (request: Request, response: Response, next: Function) => {
  console.log(`${request.method} ${request.path}`)
  next()
}

export {
  requestLogger
}
