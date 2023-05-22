import { Router } from "express";
import { cartGetController } from "../controllers/api/cartGetController.js";
import { cartPostController } from "../controllers/api/cartPostController.js";
import { cartManager } from "../dao/cartManager.js";
import  {productManager}  from "../dao/productManager.js";
import { Usuario } from "../middlewares/autorizacion.js";
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
        const producto = await productManager.encontrarUnoConId(idProducto)
        const quantity = 1
        const productoExiste = await carrito.products.find(c => c.product === idProducto)
        const nuevoCarrito = new DatosFuturoCarrito(producto, quantity)
        if(productoExiste){
            productoExiste.quantity = productoExiste.quantity + 1;
            await cartManager.actualizarUnoPush(idCarrito, productoExiste)
        }else 
        {await cartManager.actualizarUnoPush(idCarrito,nuevoCarrito)}
        res.status(201).json(nuevoCarrito)
    } catch (error) {
        next(error)
    }
})

routerCarts.delete("/:cid/product/:pid", Usuario, async(req,res,next) => {
    try {
        const idProducto = req.params.pid;
        const idCarrito = req.params.cid;
        const carrito = await cartManager.encontrarUnoConId(idCarrito)
        const encontrar = carrito.products.find(p => p.product == idProducto)
        console.log(encontrar)
        const carritoNuevo = await cartManager.actualizarUnoPull(idCarrito, encontrar)
        res.status(201).json(carritoNuevo)
    } catch (error) {
        next(error)
    }
})

routerCarts.put("/:cid/purchase", Usuario, async(req,res,next) => {
    try {
        const idCarrito = req.params.cid;
        const carrito = await cartManager.encontrarUnoConId(idCarrito)
        console.log("carrito comprado " + carrito)
        const nuevo = []
        const carritoNuevo = await cartManager.actualizarUnoPull(idCarrito, nuevo)
        if(carritoNuevo){
            new Ticket({amount:nuevo,purchaser:req.session.user.email})
        }
        
        const info = await emailService.send(req.session.user.email, mensaje)
        console.log(info)
        
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