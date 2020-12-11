import insertUser from "../../data/insertUser";
import { generateToken } from "../../services/authenticator";
import { hash } from "../../services/hashManager";
import { idGenerator } from "../../services/idGenerator";


export const  createUserBusiness = async (input: any):Promise<string> => {

 try {
     
 

   if(!input.name || !input.email || !input.nickname ||
        !input.password 
   ){
       throw new Error("Por favor, preencha todos os campos.")
     
   }

   //algo errado nessa validação, não está mostrando a mensagem
   if(input.password < 6){
       throw new Error("A Senha deve ter no mínimo 6 caracteres")
   }


   //gerando o id
   const id:string =  idGenerator()

   //hasheando a senha do user
   const cypherPassword = await hash(input.password);

   await insertUser(
       id,
       input.name,
       input.email,
       input.nickname,
       cypherPassword
   )

   //gerando o token
   const token: string = generateToken({
       id
   })
   
   //retorna o token para passar para o endpoint
   return token

    //criar um erro para proteger o banco, caso as informações acima não sejam válidas   
    }catch (error) {
        throw new Error('Erro de banco de dados' + error.sqlMessage)
    }   
   
}