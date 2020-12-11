//Criação de user
import {Request, Response} from 'express'
import { createUserBusiness } from '../../business/user/createUserBusiness'


export default async function createUser(req:Request, res: Response){
    try {
        //objeto bounder
        const input = {
           name : req.body.name,
           email : req.body.email,
           nickname:req.body.nickname,
           password: req.body.nickname
        }
    //agora o token vem da business
     const token = createUserBusiness(input)

        
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