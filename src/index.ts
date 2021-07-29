import { App } from './app'
import { UserController } from './controllers/user/user.controller';

require('dotenv').config()

const PORT = process.env.BACKEND_PORT


const userController = new UserController()

const app = new App([userController], PORT)

app.listen(() => {
  console.log(`App listening on the port ${PORT}`)
})
