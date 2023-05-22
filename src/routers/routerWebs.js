import { Router } from "express";
import { cartManager } from "../dao/cartManager.js";
import  {productManager}  from "../dao/productManager.js";

const routerWeb = Router();

routerWeb.get("/", async (req,res) => {
    const productos = await productManager.encontrar()
    res.render("home", {hayProductos: productos.length > 0, productos});
    console.log(productos)
})


routerWeb.get("/realtimeproducts", async (req,res) => {
    const productos = await productManager.encontrar()
    res.render("realTimeProducts", {hayProductos: productos.length > 0, productos})
})

// routerWeb.get("/products", async (req,res) => {
//         const criterio = {}
//         const opciones = {limit: 3, page: 1, customLabels: customLabels, sort: {price: -1}}
//         const productos = await productManager.paginar(criterio,opciones)
//         const productosStringify = JSON.stringify(productos)
//         console.log(productosStringify)
//     res.render("products", {productos})
// })

routerWeb.get("/carts/:cid", async(req,res,next)=>{
    try {
        const cartId = req.params.cid;
        const carrito = await cartManager.encontrarUnoConIdyPopular(cartId)
        const productoCarrito = carrito.products
        console.log(carrito)
        res.render("carts",{productoCarrito})
    } catch (error) {
        next(error)
    }
})
export default routerWeb;