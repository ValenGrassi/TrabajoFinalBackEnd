import { DatosFuturoProducto } from "../../models/DatosFuturoProducto.js";
import { productosService } from "../../services/products.service.js";

export async function productosPostController(req, res, next) {
    try {
        const datosFuturoProducto = new DatosFuturoProducto(req.body);
        const productoRegistrado = await productosService.registrar(datosFuturoProducto);
        res.status(201).json(productoRegistrado);
    }
    catch (error) {
        next(error);
    }
}



