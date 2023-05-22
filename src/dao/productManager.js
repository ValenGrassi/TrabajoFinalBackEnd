import { ManagerMongoose } from "./ManagerMongoose.js"
import mongoosePaginate from "mongoose-paginate-v2"
import { model, Schema } from "mongoose"

const productSchema = new Schema({
        status: {type: Boolean ,required: true},
        thumbnail: {type: String ,required: true}, 
        title: {type: String ,required: true}, 
        description: {type: String ,required: true}, 
        price: {type: Number ,required: true}, 
        code: {type: Number ,required: true}, 
        stock: {type: Number ,required: true}, 
        category: {type: String ,required: true} 
})

productSchema.plugin(mongoosePaginate)
export const productManager = new ManagerMongoose("products", productSchema) 

