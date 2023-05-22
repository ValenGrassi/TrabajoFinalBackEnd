import { Schema } from "mongoose"
import { ManagerMongoose } from "./ManagerMongoose.js"

const cartSchema = new Schema({
    products: {
        type: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: "products"
                }
            }
        ],
        default: []
    },
})

export const cartManager = new ManagerMongoose("carts", cartSchema)