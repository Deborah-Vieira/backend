import { connection } from "../connection"

//passo por paramentro as informações de cadastro para inserção no banco
export default async function insertUser(
    id: string,
    name: string,
    email: string,
    nickname: string,
    password: string

){
    try {
        await connection.insert({
            id, 
            name,
            email,
            nickname,
            password
        }).into('User_full')
        
    } catch (error) {
        throw new Error('Erro de banco de dados' + error.sqlMessage)
    }
    
}