

import { UserDatabase } from "../data/use/UseDatabase";
import { LoginInputDTO, User } from "../model/User";
import { HashManager } from "../services/hashManager";

import { IdGenerator } from "../services/idGenerator";

/* cade as validações?? as regras para a criação do user????
 */
export class UserBusiness { 

    public async signup (name: string, email: string, nickname: string,  password: string): Promise<string> {

        //gerando o id
        const idGenerator = new IdGenerator()
        const id = idGenerator.generate()

        const userDatabase = new UserDatabase()

        await userDatabase.signup(id, name, email, nickname, password)

        return id;    
    }

    public async getUserByEmail(input: LoginInputDTO){

        const userDatabase = new UserDatabase();
        const user: User = await userDatabase.selectByEmail (input.email);

        const hashManager = new HashManager();
        const hashCompare = await hashManager.compare(input.password, user.getPassword())

        if(!hashCompare){
            throw new Error("Invalid password!");
        }

        return user;

    }


}