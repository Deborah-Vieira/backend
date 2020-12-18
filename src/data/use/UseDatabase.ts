import { User } from '../../model/User'
import {BaseDatabase } from '../BaseDatabase'

//passo por paramentro as informações de cadastro para inserção no banco
export class UserDatabase extends BaseDatabase{ 
    //argumentos nome_das_tabelas privados
    private static TABLE_NAME = "User_full"


    public  async  signup(id: string, name: string,email: string, nickname: string, password: string){
        try {
            await super.getConnection()
            .insert({
                id, 
                name,
                email,
                nickname,
                password
            }).into(UserDatabase.TABLE_NAME)
            
        } catch (error) {
            throw new Error('Erro de banco de dados' + error.sqlMessage)
        }
        
    }


    public async  selectByEmail(email: string):Promise<User> {
    
        try {
            const result = await this.getConnection()
                    .select('*')
                    .from(UserDatabase.TABLE_NAME)
                    .where({ email })
            return User.toUserModel(result[0])
            
            
        } catch (error) {
            throw new Error( error.message || error.sqlMessage)
        }
        
    }
}