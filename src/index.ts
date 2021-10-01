import { App } from './app'
import { UserController } from './controllers/user/user.controller';
import { InterestController } from './controllers/interests/interests.controller';

require('dotenv').config()

const PORT = process.env.BACKEND_PORT


const userController = new UserController()
const interestController = new InterestController()

const app = new App([userController, interestController], PORT)

app.listen(() => {
  console.log(`App listening on the port ${PORT}`)
})