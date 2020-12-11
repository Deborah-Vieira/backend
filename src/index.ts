import express from 'express'
//o index acontece antes do knex
import cors from 'cors'
import dotenv from 'dotenv'

import { photoRouter } from './routes/photosRoutes'
import { useRouter } from './routes/Useroutes'


dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())


//rotas
app.use("/use", useRouter)
app.use("/photo", photoRouter)




app.listen(3003, () => {
   console.log('Servidor rodando na porta 3003')
})
