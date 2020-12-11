import { connection } from "../connection"

//passo por paramentro as informações de cadastro para inserção no banco
export default async function insertPhoto(
    id: string,
	subtitle: string,
	author: string,
	date: Date,
	file: string,
	collection: string
){
    try {
        await connection.insert({
            id,
            subtitle,
            author,
            date,
            file,
            collection     
       
        }).into('Photos_full')
        
    } catch (error) {
        throw new Error('Erro de banco de dados' + error.sqlMessage)
    }
  
}

