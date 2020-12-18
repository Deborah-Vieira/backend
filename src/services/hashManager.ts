import * as bcrytp from 'bcryptjs'

export class HashManager {
    public async  hash (plainText:string):Promise<string>  {
        //conta de segurança, no caso 12
        const rounds = Number(process.env.BCRYPT_COST);
        //string aleatoria
        const salt = await bcrytp.genSalt(rounds)
        //resultado
        const result = bcrytp.hash(plainText, salt)
        return  result
    }
    //comparando
    public async compare( plainText:string, cypherText:string):Promise<boolean> {
     return await bcrytp.compare( plainText ,cypherText)

    }

}