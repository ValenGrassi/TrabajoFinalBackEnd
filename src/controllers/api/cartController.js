import { DatosFuturoCarrito } from "../../models/DatosFuturoCarrito.js";
import { cartService } from "../../services/carts.service.js";
import { cartManager } from "../../dao/cartManager.js"
import { productManager } from "../../dao/productManager.js";
import { Ticket } from "../../models/Ticket.js";
import { ticketManager } from "../../dao/ticketManager.js";

export async function cartGetController(req,res,next){
    try {
        const carritos = await cartManager.encontrar()
        res.status(201).json(carritos)
    } catch (error) {
        next(error)
    }
}

export async function cartPostController(req, res, next) {
    try {
        const datosFuturoCarrito = new DatosFuturoCarrito()
        const carritoRegistrado = await cartService.registrar(datosFuturoCarrito)
        req.session.user.cartId = carritoRegistrado._id
        res.status(201).json(carritoRegistrado)
    }
    catch (error) {
        next(error);
    }
}

export async function cartGetWithIdController(req,res,next){
    try {
        const idCarrito = req.params.cid;
        const carrito = await cartManager.encontrarUnoConIdyPopular(idCarrito)
        if(!carrito){throw new Error("No existe el carrito")}
        res.status(201).json(carrito)
    } catch (error) {
        next(error)
    }
}

export async function addProductToCartController(req,res,next){
    try {
        const carrito = await cartService.addProductToCartService(req.params.pid,req.params.cid)
        res.status(201).json(carrito)
    } catch (error) {
        next(error)
    }
}

export async function deleteProductFromCartController(req,res,next){
    try {
        const carrito = await cartService.deleteProductFromCartService(req.params.pid,req.params.cid)
        res.status(201).json(carrito)
    } catch (error) {
        next(error)
    }
}

export async function deleteCartController(req,res,next){
    try {
        const idCarrito = req.params.cid;
        const carrito = await cartManager.encontrarUnoConId(idCarrito)
        const eliminado = await cartManager.eliminarUno({_id: carrito.id})
        res.status(201).json(eliminado)
    } catch (error) {
        next(error)
    }
}

export async function purchaseCartController(req,res,next){
    try {
        const idCarrito = req.params.cid;
        const carrito = await cartManager.encontrarUnoConId(idCarrito)
        if(carrito){
            const ticket = new Ticket({amount:carrito.totalPrice,purchaser:req.session.user.email})
            const ticketGuardado = await ticketManager.guardar(ticket)
            cartManager.eliminarUno({_id: carrito.id})
            req.session.user.cartId = null
            res.status(201).send(ticketGuardado)
        }
        // await emailService.send(req.session.user.email, mensaje)
        
    } catch (error) {
        next(error)
        console.log(error)
    }
}