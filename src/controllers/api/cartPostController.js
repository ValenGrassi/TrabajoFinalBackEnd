import { DatosFuturoCarrito } from "../../models/DatosFuturoCarrito.js";
import { cartService } from "../../services/carts.service.js";

export async function cartPostController(req, res, next) {
    try {
        const datosFuturoCarrito = new DatosFuturoCarrito()
        const carritoRegistrado = await cartService.registrar(datosFuturoCarrito)
        res.status(201).json(carritoRegistrado)
    }
    catch (error) {
        next(error);
    }
}

