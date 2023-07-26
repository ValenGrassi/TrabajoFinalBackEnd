import { Schema } from "mongoose"
import { ManagerMongoose } from "./ManagerMongoose.js"

const ticketSchema = new Schema({
    code: {type: String},
    purchase_datetime: {type: String},
    amount: {type: Number},
    purchaser: {type: String}
})

export const ticketManager = new ManagerMongoose("ticket", ticketSchema)