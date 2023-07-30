import { productosService } from "../../services/products.service.js";
import { productManager } from "../../dao/productManager.js"

export async function productosPostController(req, res, next) {
    try {
        const producto = req.body
        if(req.session.user && req.session.user.rol == "premium"){
            producto.owner = req.session.user.email
        }
        const productoRegistrado = await productosService.registrar(producto);
        res.status(201).json(productoRegistrado);
    }
    catch (error) {
        next(error);
    }
}

export async function productosGetController(req,res,next) {
    try{
        const productos = await productManager.encontrar()
        res.status(201).json(productos)
    }
    catch(error){
        next(error)
    }
}

export async function productosPutController(req,res,next){
    try{
        const productoActualizado = await productosService.productosPutService(req.params.code, req.body)
        res.status(201).json(productoActualizado)
    }
    catch(error){
        next(error)
    }
}

export async function productosDeleteController(req,res,next){
    try {
        const mensaje = await productosService.productosDeleteService(req.params._id)
        res.status(201).send(`el producto con el id ${req.params._id} fue eliminado. ${mensaje}`)
    } 
    catch (error) {
        next(error)
    }
}