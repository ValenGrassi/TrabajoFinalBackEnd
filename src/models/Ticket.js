export class Ticket{
    constructor({code = Math.floor(Math.random()*100),purchase_datetime = new Date().toString(),amount,purchaser}){
        this.code = code
        this.purchase_datetime = purchase_datetime
        this.amount = amount
        this.purchaser = purchaser
    }
}

