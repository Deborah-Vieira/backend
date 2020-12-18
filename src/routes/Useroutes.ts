import express from 'express'
import { UserController } from '../controller/user/UserController'

//importando o router do express
export const useRouter = express.Router()
const useController = new UserController()

useRouter.post("/signUp", useController.signup )
useRouter.post("/login", useController.login)

