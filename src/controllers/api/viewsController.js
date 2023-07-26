import { cartManager } from "../../dao/cartManager.js"
import { productManager } from "../../dao/productManager.js"
import { DatosFuturoCarrito } from "../../models/DatosFuturoCarrito.js"
import { userRepository } from "../../repositories/usersRepository.js"
import { cartService } from "../../services/carts.service.js"

export async function registerViewController(req,res,next){
    try {
        res.render("register", {pageTitle: "Registro"})
    } catch (error) {
        next(error)
    }
}

export async function loginViewController(req,res,next){
    try {
        res.render("login", {pageTitle: "Login"})
    } catch (error) {
        next(error)
    }
}

export async function tokenViewController(req,res,next){
    try {
        res.render("token", {pageTitle: "Token"})
    } catch (error) {
        next(error)
    }
}

export async function recuperarViewController(req,res,next){
    try {
        res.render("recuperar", {pageTitle: "Recuperar"})
    } catch (error) {
        next(error)
    }
}

export async function dashViewController(req,res,next){
    try {
        res.redirect("/user")
    } catch (error) {
        next(error)
    }
}


export async function userViewControler(req,res,next){
    try {
        const user = await userRepository.encontrarUnoConValor({email:req.session.user.email}, {returnDto: true})
        req.session.user.id = user._id
        res.render("user", {pageTitle: "User", user: req.session.user})
    } catch (error) {
        next(error)
    }
}

export async function productsViewController(req,res,next){
    try {
        const productos = await productManager.encontrar()
        if(!req.session.user?.cartId){
            const datosFuturoCarrito = new DatosFuturoCarrito()
            const carritoRegistrado = await cartService.registrar(datosFuturoCarrito)
            req.session.user.cartId = carritoRegistrado._id
        }
        productos.forEach(producto => producto.cartId = req.session.user.cartId)
        res.render("realTimeProducts", {productos})
    } catch (error) {
        next(error)
    }
}

export async function cartsViewController(req,res,next){
    try {
        const carrito = await cartManager.encontrarUnoConId(req.session.user.cartId)
        res.render("cart", {pageTitle: "Cart", carrito: carrito})
    } catch (error) {
        next(error)
    }
}