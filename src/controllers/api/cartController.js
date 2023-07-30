import { DatosFuturoCarrito } from "../../models/DatosFuturoCarrito.js";
import { cartService } from "../../services/carts.service.js";
import { cartManager } from "../../dao/cartManager.js"

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
        const eliminado = await cartService.deleteCartService(req.params.cid)
        res.status(201).json(eliminado)
    } catch (error) {
        next(error)
    }
}

export async function purchaseCartController(req,res,next){
    try {
        const ticket = await cartService.purchaseCartService(req.params.cid)
        if(ticket){
            req.session.user.cartId = null
            res.status(201).send(ticketGuardado)
        }
        // await emailService.send(req.session.user.email, mensaje)
    } catch (error) {
        next(error)
        console.log(error)
    }
}