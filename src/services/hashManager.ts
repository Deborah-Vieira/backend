import * as bcrytp from 'bcryptjs'

export const hash = async(plainText:string):Promise<string> => {
    //conta de segurança, no caso 12
    const rounds = Number(process.env.BCRYPT_COST);
    //string aleatoria
    const salt = await bcrytp.genSalt(rounds)
    //
    return  bcrytp.hash(plainText, salt)

}

//comparando
export const compare = async ( plainText:string, cypherText:string):
 Promise<boolean>  => {
    return bcrytp.compare( plainText ,cypherText)
}