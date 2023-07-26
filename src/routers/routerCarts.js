import { Router } from "express";
import { addProductToCartController, cartGetController, cartGetWithIdController, cartPostController, deleteCartController, deleteProductFromCartController, purchaseCartController } from "../controllers/api/cartController.js";
import { Usuario, UsuarioPremium } from "../middlewares/autorizacion.js";


export const routerCarts = Router();
routerCarts.post("/", Usuario, cartPostController);

routerCarts.get("/",Usuario, cartGetController)

routerCarts.get("/:cid", cartGetWithIdController)

routerCarts.post("/:cid/product/:pid", Usuario, addProductToCartController)

routerCarts.delete("/:cid/product/:pid", Usuario, deleteProductFromCartController)

routerCarts.delete("/:cid", Usuario, deleteCartController)

routerCarts.post("/:cid/purchase", Usuario, purchaseCartController)

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