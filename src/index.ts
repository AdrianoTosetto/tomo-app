import express from 'express';
import { Request, Response }  from 'express';

import { requestLogger } from './middlewares/requests';

const app = express();
 
app.use(requestLogger)

app.get('/', (request: Request, response: Response) => {
  response.send('Hello world!');
});
 
app.listen(2000);