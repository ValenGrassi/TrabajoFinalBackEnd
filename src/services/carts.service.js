import { cartManager } from "../dao/cartManager.js";
import { productManager } from "../dao/productManager.js";

class CartService{
    async registrar(datosFuturoCarrito){
        const carritoRegistrado = await cartManager.guardar(datosFuturoCarrito);
        return carritoRegistrado;
    }
    async addProductToCartService(idProducto, idCarrito){
        const carrito = await cartManager.encontrarUnoConId(idCarrito)
        if(!carrito){throw new Error("el carrito no existe")}

        const producto = await productManager.encontrarUnoConId(idProducto)
        if(!producto){throw new Error("el producto no existe")}

        const productoExiste = carrito.products.find(c => c.title === producto.title)
        if(productoExiste){
            if(productoExiste.quantity < producto.stock){
                productoExiste.quantity++
                producto.stock--
            }
        } else {
            carrito.products.push({title: producto.title, stock: producto.stock, price: producto.price, quantity: 1, _id: producto._id})
            producto.stock--
        }

        const totalPrice = carrito.products.reduce((acumulador, actual) => acumulador + (actual.price * actual.quantity), 0)
        carrito.totalPrice = totalPrice
        // if(user.rol == "premium" && producto.owner == user.mail){
        //     throw new Error(errores.NOT_AUTHORIZED)
        // }
        await cartManager.actualizarUno({_id: idCarrito},carrito)
        await productManager.actualizarUno({_id: idProducto},producto)

        return carrito
    }
    async deleteProductFromCartService(idProducto, idCarrito){
        const producto = await productManager.encontrarUnoConId(idProducto)
        if(!producto) throw new Error("no se encontro producto")

        const carrito = await cartManager.encontrarUnoConId(idCarrito)
        if(!carrito) throw new Error("no se encontro carrito")

        const encontrar = carrito.products.findIndex(p => p.title == producto.title);
        if (encontrar < 0) throw new Error("Ese producto no está en el carrito");


        carrito.products.splice(encontrar,1)
        await cartManager.actualizarUno({_id: idCarrito}, carrito)
        producto.stock++
        await productManager.actualizarUno({_id: idProducto}, producto)
        
        return carrito
    }
}

export const cartService = new CartService()