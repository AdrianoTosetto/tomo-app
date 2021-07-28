import express from 'express';
import { Request, Response }  from 'express';

import { requestLogger } from './middlewares/requests';

import test from './db/index'

require('dotenv').config()

const PORT = process.env.BACKEND_PORT

const app = express();
 
app.use(requestLogger)

app.get('/', (request: Request, response: Response) => {
  test()
  response.send('Hello world!');
});

 
app.listen(PORT, () => {
  console.log(`Server listening at ${PORT}...`)
});