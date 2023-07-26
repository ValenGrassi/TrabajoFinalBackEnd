import {Schema} from "mongoose"
import { ManagerMongoose } from "./ManagerMongoose.js"

const userSchema = new Schema({
        nombre: {type: String},
        apellido: {type: String},
        email: {type: String, required: true, index: true},
        edad: {type: Number},
        password: {type: String, required: true},
        rol: {type: String, default: "usuario"},
        last_connection: {type: String, required: true},
        documents: {type: Array},
        cartId: {type: String}
    })    

export const userManager = new ManagerMongoose("users", userSchema)
