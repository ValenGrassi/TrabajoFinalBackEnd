import { crearCarritoMock } from "../src/mocks/CarritoMock.js";
import { crearProductoMock } from "../src/mocks/ProductoMock.js";
import { crearUsuarioMock } from "../src/mocks/UsuarioMock.js";
import { DatosFuturoCarrito } from "../src/models/DatosFuturoCarrito.js";

// const cantidad = 1

// console.log(new DatosFuturoCarrito(producto1,cantidad))
console.log("producto: ")
console.log(crearProductoMock().toCart());

console.log("carrito: ")
console.log(crearCarritoMock())

console.log("usuario: ")
console.log(crearUsuarioMock().toDto())