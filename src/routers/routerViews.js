import {Router} from "express"
import { productManager } from "../dao/productManager.js";
import { autenticacionLogin, autenticacionRedirect } from "../middlewares/autenticacion.js";
import { userRepository } from "../repositories/usersRepository.js";

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

routerViews.get("/realtimeproducts", async (req,res) => {
    const productos = await productManager.encontrar()
    res.render("realTimeProducts", {hayProductos: productos.length > 0, productos})
})

export default routerViews