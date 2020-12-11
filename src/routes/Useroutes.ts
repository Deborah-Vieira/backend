import express from 'express'
import createPhoto from '../controller/photos/photos'
import login from '../controller/user/login'
import createUser from '../controller/user/signUp'

//importando o router do express
export const useRouter = express.Router()

useRouter.post("/signUp", createUser)
useRouter.post("/login", login)

useRouter.post('/', createPhoto) 