import * as jwt from 'jsonwebtoken'
export class Authenticator {
   public generateToken(payload: AuthenticationData): string {
      return jwt.sign(
         payload,
         process.env.JWT_KEY as string,
         {
            expiresIn: "24min"
         }
      )
   }

   public getTokenData(
      token: string
   ): AuthenticationData {
      return jwt.verify(
         token,
         process.env.JWT_KEY as string
      ) as AuthenticationData
   }

   }
   interface AuthenticationData {
      id: string;
   }