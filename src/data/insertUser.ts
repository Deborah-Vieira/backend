import { connection } from "../index"

//passo por paramentro as informações de cadastro para inserção no banco
export default async function insertUser(
    id: string,
    name: string,
    email: string,
    nickname: string,
    password: string

){
    await connection.insert({
        id, 
        name,
        email,
        nickname,
        password
    }).into('User_full')
}