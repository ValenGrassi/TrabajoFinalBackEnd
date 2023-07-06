import { Router } from "express";
import { cartGetController } from "../controllers/api/cartGetController.js";
import { cartPostController } from "../controllers/api/cartPostController.js";
import { cartManager } from "../dao/cartManager.js";
import  {productManager}  from "../dao/productManager.js";
import { errores } from "../errors/errorHandler.js";
import { Usuario, UsuarioPremium } from "../middlewares/autorizacion.js";
import { DatosFuturoCarrito } from "../models/DatosFuturoCarrito.js";
import { Ticket } from "../models/Ticket.js";
import { emailService } from "../services/email.service.js";


export const routerCarts = Router();
routerCarts.post("/", Usuario,cartPostController);

routerCarts.get("/",Usuario, cartGetController)

routerCarts.get("/:cid", async (req,res,next) => {
    try {
        const idCarrito = req.params.cid;
        const carrito = await cartManager.encontrarUnoConIdyPopular(idCarrito)
        if(!carrito){throw new Error("No existe el carrito")}
        res.status(201).json(carrito)
    } catch (error) {
        next(error)
    }
})

routerCarts.post("/:cid/product/:pid", Usuario, async(req,res,next) => {
    try {
        const idProducto = req.params.pid;
        const idCarrito = req.params.cid;
        const carrito = await cartManager.encontrarUnoConId(idCarrito)
        if(!carrito){throw new Error("el carrito no existe")}
        const producto = await productManager.encontrarUnoConId(idProducto)
        if(!producto){throw new Error("el producto no existe")}
        carrito.products.push({title: producto.title, stock: producto.stock, price: producto.price})
        const totalPrice = carrito.products.reduce((acumulador, actual) => acumulador + actual.price, 0)
        carrito.totalPrice = totalPrice
        // if(user.rol == "premium" && producto.owner == user.mail){
        //     throw new Error(errores.NOT_AUTHORIZED)
        // }
        // const productoExiste = await carrito.products.find(c => c.title === producto.title)
        const resultado = await cartManager.actualizarUno({_id: idCarrito},carrito)
        res.status(201).json(resultado)
    } catch (error) {
        next(error)
    }
})

routerCarts.delete("/:cid/product/:pid", Usuario, async(req,res,next) => {
    try {
        const idProducto = req.params.pid;
        const producto = await productManager.encontrarUnoConId(idProducto)
        const idCarrito = req.params.cid;
        const carrito = await cartManager.encontrarUnoConId(idCarrito)
        if(!carrito) throw new Error("no se encontro carrito")
        const encontrar = carrito.products.findIndex(p => p.title == producto.title)
        if(!encontrar) throw new Error("ese producto no esta en el carrito")
        carrito.products.splice(encontrar,1)
        await cartManager.actualizarUno({_id: idCarrito}, carrito)
        res.status(201).json(carrito)
    } catch (error) {
        next(error)
    }
})

routerCarts.delete("/:cid", Usuario, async(req,res,next) => {
    try {
        const idCarrito = req.params.cid;
        const carrito = await cartManager.encontrarUnoConId(idCarrito)
        const eliminado = await cartManager.eliminarUno({_id: carrito.id})
        res.status(201).json(eliminado)
    } catch (error) {
        next(error)
    }
})

routerCarts.put("/:cid/purchase", Usuario, async(req,res,next) => {
    try {
        const idCarrito = req.params.cid;
        const carrito = await cartManager.encontrarUnoConId(idCarrito)
        req.logger.info("carrito comprado " + carrito)
        const nuevo = []
        const carritoNuevo = await cartManager.actualizarUnoPull(idCarrito, nuevo)
        if(carritoNuevo){
            new Ticket({amount:nuevo,purchaser:req.session.user.email})
        }
        
        const info = await emailService.send(req.session.user.email, mensaje)
        req.logger.info(info)
        
        res.status(201).json(carritoNuevo)
    } catch (error) {
        next(error)
    }
})

// routerCarts.put("/:cid/product/:pid", async(req,res,next) => {
//     try {
//         const idProducto = req.params.pid;
//         const idCarrito = req.params.cid;
//         const carrito = await cartManager.encontrarUnoConId(idCarrito)
//         const encontrar = carrito.products.find(p => p.product == idProducto)
//         await cartManager.actualizarUnoPull(idCarrito, encontrar)
//         encontrar.quantity = req.body.quantity
//         const carritoNuevo = await cartManager.actualizarUnoPush(idCarrito, encontrar)
//         res.status(201).json(encontrar)
//     } catch (error) {
//         next(error)
//     }
// })