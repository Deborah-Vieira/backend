import express from 'express'
import createPhoto from '../controller/photos/photos'


//importando o router do express
export const photoRouter = express.Router()

photoRouter.post('/', createPhoto) 
photoRouter.get('/:id', getPhotoByID) 