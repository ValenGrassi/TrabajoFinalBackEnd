import mongoose from "mongoose";

export class ManagerMongoose {
    constructor(nombreCollecion, schema) {
        this.collection = mongoose.model(nombreCollecion, new mongoose.Schema(schema, {versionKey: false}));
    }

    async actualizarColeccion(cambio){
        await this.collection.deleteMany({});
        return await this.collection.insertMany(cambio)
        
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

    async actualizarUnoPull(id,cambio){
        return await this.collection.findOneAndUpdate({"_id": id},{$pull: {"products": cambio}})
    }

    async actualizarUnoPush(id,cambio){
        return await this.collection.findOneAndUpdate({"_id": id},{$push: {"products": cambio}})
    }

    async actualizarUno(id, cambio){
        return await this.collection.updateOne(id, cambio).lean()
    }
    
    async eliminarUno(id){
        return await this.collection.findOneAndDelete({"_id": id})
    }

    async paginar(criterio, opciones){
        return await this.collection.paginate(criterio,opciones)
    }

}
