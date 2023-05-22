import { productManager } from "../../dao/productManager.js"

export async function productosGetController(req,res,next) {
    try{
        const productos = await productManager.encontrar()
        res.status(201).json(productos)
    }
    catch(error){
        next(error)
    }
}
