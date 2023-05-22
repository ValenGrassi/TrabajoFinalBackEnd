export class Ticket{
    constructor(code = code=Math.floor(Math.random()*100),purchase_datetime = new Date(8.64e15).toString(),amount,purchaser){
        this.code = code
        this.purchase_datetime = purchase_datetime
        this.amount = amount
        this.purchaser = req.sessions.user.email
    }
}

