//Criação de user
import {Request, Response} from 'express'
import { createPhotoBusiness } from '../../business/photos/createPhotoBusiness'


export default async function createPhoto(req:Request, res: Response){
    try {
        
         //objeto bounder
        const input = {
            subtitle : req.body.subtitle,
            author : req.body.author,
            date:req.body.date,
            file: req.body.file,
            collection: req.body.collection
         }
     //agora o token vem da business
      const token = createPhotoBusiness(input)
 
       
        
        res.status(200).send({
            message: "Usuário criado com sucesso!",
            token
            
        })
        return

    } catch (error) {
        res.status(400).send({
            message: error.message || error.sqlMessage
        })
    
        return
    
    }
   

}