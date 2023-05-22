import mongoose from "mongoose";

export class ManagerMongoose {
    constructor(nombreCollecion, schema) {
        this.collection = mongoose.model(nombreCollecion, new mongoose.Schema(schema, {versionKey: false}));
    }

    async guardar(registro){
       return await this.collection.create(registro)
    }

    async encontrar(){
        return await this.collection.find().lean()
    }

    async encontrarUnoConValor(criterio){
        return await this.collection.findOne(criterio).lean()
    }
    
    async encontrarUnoConId(id){
        return await this.collection.findById(id)
    }

    async encontrarUnoConIdyPopular(id){
        return await this.collection.findById(id).populate("products.product")
    }

    async reemplazarUno(id,nuevo){
        return await this.collection.findOneAndReplace({"_id": id}, {nuevo})
    }

    async agregarCarrito(id,cambio){
        return await this.collection.findOneAndUpdate({"_id": id}, {$push: {cambio}})
    }
    
    async actualizarUnoPull(id,cambio){
        return await this.collection.findOneAndUpdate({"_id": id},{$pull: {"products": cambio}})
    }

    async actualizarUnoPush(id,cambio){
        return await this.collection.findOneAndUpdate({"_id": id},{$push: {"products": cambio}})
    }
    
    async actualizarUnoConCódigo(codigo, cambio){
        return await this.collection.findOneAndUpdate({code: codigo},cambio)
    }

    async borrarUnoConCódigo(codigo){
        return await this.collection.findOneAndRemove(codigo)
    }

    async sumarProducto(id){
        return await this.collection.findOne({"carts.products.product": id})
    }

    async paginar(criterio, opciones){
        return await this.collection.paginate(criterio,opciones)
    }

}
