import { Router } from "express";
import { Administrador } from "../middlewares/autorizacion.js";
import { crearProductoMock } from "../mocks/ProductoMock.js";
import {productosService} from "../services/products.service.js"
 
export const routerTests = Router();

routerTests.get("/mockingproducts", Administrador , async(req,res,next) => {
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

routerTests.get("/loggerTest", async(req,res,next) => {
    try {
        req.logger.debug("Esto es un log debug")
        req.logger.http("Esto es un log http")
        req.logger.info("Esto es un log info")
        req.logger.warning("esto es un log warning")
        req.logger.error("esto es un log error")
        req.logger.fatal("esto es un log fatal")
        res.status(201).send("logs enviados")
    } catch (error) {
        next(error)
    }
})