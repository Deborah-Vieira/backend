export type Transation = {
    value:number,
    date:Date,
    description: string

}

export type Account = {
    name: string,
    CPF: string,
    dateBirth: Date,
    balance: number,
    statement: Array<Transation>
}
