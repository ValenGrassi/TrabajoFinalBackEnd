import { Router } from "express";
import { productosDeleteController, productosGetController, productosPostController, productosPutController } from "../controllers/api/productController.js";
import { autenticacionRedirect } from "../middlewares/autenticacion.js";
import { Administrador, Premium, Usuario } from "../middlewares/autorizacion.js";

export const routerProducts = Router();

routerProducts.post("/", autenticacionRedirect, Premium, productosPostController);
routerProducts.get("/", Usuario, productosGetController)
routerProducts.put("/:code", Premium, productosPutController)
routerProducts.delete("/:_id", Administrador, productosDeleteController)