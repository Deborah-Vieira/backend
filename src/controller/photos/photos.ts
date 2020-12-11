//Criação de user
import {Request, Response} from 'express'
import insertPhoto from '../data/insertPhoto'
import { generateToken } from '../services/authenticator'
import { idGenerator } from '../services/idGenerator'


export default async function createPhoto(req:Request, res: Response){
    try {

        if(!req.body.subtitle || !req.body.author || !req.body.date ||
            !req.body.file  || !req.body.collection 
        ){
            throw new Error("Por favor, preencha todos os campos.")
          
        }

        //gerando o id
        const id:string =  idGenerator()

        await insertPhoto(
            id,
            req.body.subtitle,
            req.body.author,
            req.body.date,
            req.body.file,
            req.body.collection,
           
        )

        //como authenticar o token para criação?
        

        //gerando o token
        const token: string = generateToken({
            id
        })
        
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