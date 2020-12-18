
import insertPhoto from "../data/photos/insertPhoto";
import { generateToken } from "../services/authenticator";
import { idGenerator } from "../services/idGenerator";


export const  createPhotoBusiness = async (input: any):Promise<string> => {

 try {
        if(!input.subtitle || !input.author || !input.date ||
            !input.file  || !input.collection 
        ){
            throw new Error("Por favor, preencha todos os campos.")
        
        }

    //gerando o id
    const id:string =  idGenerator()

    await insertPhoto(
        id,
        input.subtitle,
        input.author,
        input.date,
        input.file,
        input.collection,
       
    )

    //como authenticar o token para criação?
    

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