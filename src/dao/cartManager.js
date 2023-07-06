import { Schema } from "mongoose"
import { ManagerMongoose } from "./ManagerMongoose.js"

const cartSchema = new Schema({
    products: {type: Array},
    totalPrice: {type: Number}
})

export const cartManager = new ManagerMongoose("carts", cartSchema)