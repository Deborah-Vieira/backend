import express from 'express'
import knex from 'knex'
import cors from 'cors'
import dotenv from 'dotenv'
import createUser from './endpoints/signUp'
import login from './endpoints/login'



dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

//conexão com o banco
export const connection = knex({
   client: 'mysql',
   connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: 3306
   }
})

//rotas
app.post('/user/signup', createUser)
app.post('/user/login', login)


app.listen(3003, () => {
   console.log('Servidor rodando na porta 3003')
})
