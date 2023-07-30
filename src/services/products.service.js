import {productManager} from "../dao/productManager.js";
import { DatosFuturoProducto } from "../models/DatosFuturoProducto.js";

class ProductosService{
    async registrar(producto){
        const datosFuturoProducto = new DatosFuturoProducto(producto);
        const productoRegistrado = await productManager.guardar(datosFuturoProducto);
        return productoRegistrado;
    }
    
    async productosPutService(codigoProducto, cambio){
        const producto = productManager.actualizarUnoConCódigo(codigoProducto, cambio)
        return producto
    }

    async productosDeleteService(idProducto){
        const producto = await productManager.eliminarUno(idProducto)
        const email = producto.owner
        var mensaje
        if(email) { mensaje = `En este proceso se enviaría mail a ${email} de que su producto fue eliminado.`}
        return mensaje
    }
}

export const productosService = new ProductosService()