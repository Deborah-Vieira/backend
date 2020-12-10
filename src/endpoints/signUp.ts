//Criação de user
import {Request, Response} from 'express'
import insertUser from '../data/insertUser'
import { generateToken } from '../services/authenticator'
import { hash } from '../services/hashManager'
import { idGenerator } from '../services/idGenerator'


export default async function createUser(req:Request, res: Response){
    try {
        if(!req.body.name || !req.body.email || !req.body.nickname ||
             !req.body.password 
        ){
            throw new Error("Por favor, preencha todos os campos.")
          
        }

        //algo errado nessa validação, não está mostrando a mensagem
        if(req.body.password < 6){
            throw new Error("A Senha deve ter no mínimo 6 caracteres")
        }

        //gerando o id
        const id:string =  idGenerator()

        //hasheando a senha do user
        const cypherPassword = await hash(req.body.password);

        await insertUser(
            id,
            req.body.name,
            req.body.email,
            req.body.nickname,
            cypherPassword
        )

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