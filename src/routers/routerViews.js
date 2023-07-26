import {Router} from "express"
import { cartManager } from "../dao/cartManager.js";
import { productManager } from "../dao/productManager.js";
import { autenticacionLogin, autenticacionRedirect } from "../middlewares/autenticacion.js";
import { DatosFuturoCarrito } from "../models/DatosFuturoCarrito.js";
import { userRepository } from "../repositories/usersRepository.js";
import { cartService } from "../services/carts.service.js";

const routerViews = Router()

routerViews.get("/registro", (req,res,next) => {
    res.render("register", {pageTitle: "Registro"})
})

routerViews.get("/login", (req,res,next) => {
    res.render("login", {pageTitle: "Login"})
})

routerViews.get("/token",(req,res,next) =>{
    res.render("token", {pageTitle: "Token"})
})

routerViews.get("/recuperar", (req,res,next) => {
    res.render("recuperar", {pageTitle: "Recuperar"})
})

routerViews.get("/", autenticacionRedirect, (req,res,next) => {
    res.redirect("/user")
})

routerViews.get("/user",autenticacionLogin, async (req,res,next) => {
    const user = await userRepository.encontrarUnoConValor({email:req.session.user.email}, {returnDto: true})
    req.session.user.id = user._id
    res.render("user", {pageTitle: "User", user: req.session.user})
})

routerViews.get("/realtimeproducts",autenticacionRedirect, async (req,res) => {
    const productos = await productManager.encontrar()
    if(!req.session.user?.cartId){
        const datosFuturoCarrito = new DatosFuturoCarrito()
        const carritoRegistrado = await cartService.registrar(datosFuturoCarrito)
        req.session.user.cartId = carritoRegistrado._id
    }
    productos.forEach(producto => producto.cartId = req.session.user.cartId)
    res.render("realTimeProducts", {productos})
})

routerViews.get("/cart", autenticacionRedirect, async (req,res) => {
    const carrito = await cartManager.encontrarUnoConId(req.session.user.cartId)
    res.render("cart", {pageTitle: "Cart", carrito: carrito})
})

export default routerViews