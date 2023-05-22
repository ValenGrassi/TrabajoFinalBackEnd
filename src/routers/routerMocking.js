import { Router } from "express";
import { currentGetController } from "../controllers/api/currentGetController.js";
import { Administrador, Usuario } from "../middlewares/autorizacion.js";
import { crearProductoMock } from "../mocks/ProductoMock.js";
import {productosService} from "../services/products.service.js"
 
export const routerMocking = Router();

routerMocking.get("/mockingproducts", Administrador , async(req,res,next) => {
    try {
        const productos = []
        for (let i = 0; i < 100; i++) {
            productos.push(crearProductoMock())
        }
        const productoRegistrado = await productosService.registrar(productos);
        res.status(201).send("productos registrados OK!");
    } catch (error) {
        next(error)
    }
})

// no esta hecho en un controller debido a que ya tengo muchos y no quiero seguir 
//llenando la carpeta.