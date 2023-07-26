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
        console.log(req.session.user)
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
        const idProducto = req.params.pid;
        const idCarrito = req.params.cid;
        const carrito = await cartManager.encontrarUnoConId(idCarrito)
        if(!carrito){throw new Error("el carrito no existe")}
        const producto = await productManager.encontrarUnoConId(idProducto)
        if(!producto){throw new Error("el producto no existe")}
        const productoExiste = carrito.products.find(c => c.title === producto.title)
        if(productoExiste){
            if(carrito.products.quantity < producto.stock){
                productoExiste.quantity++
                producto.stock--
            }
        } else {
            carrito.products.push({title: producto.title, stock: producto.stock, price: producto.price, quantity: 1})
            producto.stock--
        }
        const totalPrice = carrito.products.reduce((acumulador, actual) => acumulador + (actual.price * actual.quantity), 0)
        carrito.totalPrice = totalPrice
        // if(user.rol == "premium" && producto.owner == user.mail){
        //     throw new Error(errores.NOT_AUTHORIZED)
        // }
        await cartManager.actualizarUno({_id: idCarrito},carrito)
        await productManager.actualizarUno({_id: idProducto},producto)
        res.status(201).json(carrito)
    } catch (error) {
        next(error)
    }
}

export async function deleteProductFromCartController(req,res,next){
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