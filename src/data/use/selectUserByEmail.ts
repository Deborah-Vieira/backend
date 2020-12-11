import {connection} from "../connection"

export type User = {
    id: string,
    name: string,
    email: string,
    nickname: string,
    password: string
 }

export default async function selectByEmail(email: string):Promise<User> {
  
    try {
       const result = await connection('User_full')
            .select('*')
            .where({ email })

            return {
                id: result[0].id,
                name: result[0].name,
                email: result[0].email,
                nickname: result[0].nickname,               
                password: result[0].password,
             }
    } catch (error) {
        throw new Error( error.message || error.sqlMessage)
    }
    
}