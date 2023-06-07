import {model, Schema} from "mongoose";
import { ManagerMongoose } from "./ManagerMongoose.js";

const resetTokenSchema = new Schema({
    idUsuario: {type: String, required: true},
    token: {type: String, required: true}
}, {versionKey: false})

export const resetTokensManager = new ManagerMongoose("resetTokens", resetTokenSchema) 
