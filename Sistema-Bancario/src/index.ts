//importando express com Request e Response e cors
import express, {Request, Response} from 'express';
import cors from 'cors';
import {accounts} from './accounts'

const app = express();

app.use(express.json());
app.use(cors());


app.post("/users/create", (req: Request, res: Response) =>{
    try{
        const {name, CPF, dateOfBirth} = req.body;

        const [day, month, year] = dateOfBirth.split("/")

        const dateBirth : Date = new Date(`${year}-${month}-${day}`)

        accounts.push({
            name,
            CPF,
            dateBirth,
            balance:0,
            statement: []      
        })
                        
        res.status(200).send({message: "User created successfully"});

    }catch(error){
        res.status(400).send(error.message);
    }
})




app.listen(3003, () => {
    console.log("Servidor funcionando!")
})
