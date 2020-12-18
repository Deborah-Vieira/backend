//Criação de user
import {Request, Response} from 'express'
import { UserBusiness } from '../../business/UserBusiness'
import { BaseDatabase } from '../../data/BaseDatabase'
import { LoginInputDTO, UserInputDTO } from '../../model/User'
import { Authenticator } from '../../services/authenticator'
import { HashManager } from '../../services/hashManager'

//O QUE O CONTROLLER ESTÁ FAZENDO????
export class UserController {
    public async signup(req:Request, res: Response){
        try {
            //limit modelado no model de user
            const input:UserInputDTO = {
            name : req.body.name,
            email : req.body.email,
            nickname:req.body.nickname,
            password: req.body.nickname
        }
/*/para cada um desses campos,
 passo a instancia da classe que vai usar o Service
 por exemplo, as crpitografias
  e as validações e autenticações.
  ou seja, se quero encriotar chamo 
  o hash no campo de senha, ele é o
   unico que precisa disso.
e assim para a necessidade de cada campo.
           */
        //encripitando a senha  
        const hashManage = new HashManager()
        const hashpassword = await hashManage.hash(input.password);

        //o que está sendo feito aqui?????
        const userBusiness = new UserBusiness()
        const userId = await userBusiness.signup(input.name, input.email, input.nickname, hashpassword)

        //o que está sendo feito aqui????
        const authenticator = new Authenticator()
        const token = authenticator.generateToken({ id: userId})

            
            res.status(200).send({
                message: "Usuário criado com sucesso!",
                token: token                
            })
            return

        } catch (error) {
            res.status(400).send({
                message: error.message || error.sqlMessage
            })
        
          
        
        }
         await BaseDatabase.destroyConnection()
    

    }

    /* LOGIN MÉTODO */
    public async login(req:Request, res: Response){
        try{
            const input: LoginInputDTO = {
                email: req.body.email,
                password: req.body.password
            }

            const userBusiness = new UserBusiness();
            const user = await userBusiness.getUserByEmail(input);

            const authenticator = new Authenticator();
            const accessToken = authenticator.generateToken({id: user.getId()});

            res.status(200).send({token: accessToken});


        }catch(error){
            res.status(400).send({error: error.message});
        }

        await BaseDatabase.destroyConnection();
    }
}

//parece que as validações estão sendo feitas aqui