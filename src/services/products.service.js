import {productManager} from "../dao/productManager.js";

class ProductosService{
    async registrar(datosFuturoProducto){
        const productoRegistrado = await productManager.guardar(datosFuturoProducto);
        return productoRegistrado;
    }
}

export const productosService = new ProductosService()