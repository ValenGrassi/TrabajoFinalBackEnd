import { DatosFuturoProducto } from "../../models/DatosFuturoProducto.js";
import { productosService } from "../../services/products.service.js";
import { productManager } from "../../dao/productManager.js"

export async function productosPostController(req, res, next) {
    try {
        const producto = req.body
        if(req.session.user.rol == "premium"){
            producto.owner = req.session.user.email
        }
        const datosFuturoProducto = new DatosFuturoProducto(producto);
        const productoRegistrado = await productosService.registrar(datosFuturoProducto);
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
        const cambio = req.body
        const codigoProducto = req.params.code;
        const producto = productManager.actualizarUnoConCódigo(codigoProducto, cambio)
        res.status(201).json(producto)
    }
    catch(error){
        next(error)
    }
}

export async function productosDeleteController(req,res,next){
    try {
        const idProducto = req.params._id;
        const producto = await productManager.eliminarUno(idProducto)
        const email = producto.owner
        var mensaje
        if(email) { mensaje = `En este proceso se enviaría mail a ${email} de que su producto fue eliminado.`}
        res.status(201).send(`el producto con el id ${idProducto} fue eliminado. ${mensaje} `)
    } 
    catch (error) {
        next(error)
    }
}