//importando express com Request e Response e cors
import express, {Request, Response} from 'express';
import cors from 'cors';
import {accounts} from './accounts'
import { NumericLiteral } from 'typescript';

const app = express();

app.use(express.json());
app.use(cors());

//create Account
app.post("/users/create", (req: Request, res: Response) =>{
    try{
        const {name, CPF, dateOfBirth} = req.body;

        const [day, month, year] = dateOfBirth.split("/")

        const dateBirth : Date = new Date(`${year}-${month}-${day}`)

        //validation age > 18
        const ageMilisseconds : number = Date.now() - dateBirth.getTime()
        const ageInYears : number = ageMilisseconds / 1000 / 60 / 60 / 24 / 365

            if(ageInYears < 18 ){
                res.statusCode = 404
                throw new Error("Age must be over 18 years");
            }

        accounts.push({
            name,
            CPF,
            dateBirth,
            balance:0,
            statement: []      
        })
                        
        res.status(200).send({message: "User created successfully"});

    }catch(error){
        res.send(error.message);
    }
})

//List Account
app.get("/users/all", (req: Request, res: Response) =>{
    try{
        if(!accounts.length){
            res.statusCode = 404
            throw new Error("No account found");
            
        }       
        res.status(200).send(accounts);

    }catch(error){
        res.send(error.message);
    }
})




app.listen(3003, () => {
    console.log("Servidor funcionando!")
})
