import { faker } from "@faker-js/faker"
import { DatosFuturoCarrito } from "../models/DatosFuturoCarrito.js"
import { DatosFuturoProducto } from "../models/DatosFuturoProducto.js"
import { crearProductoMock } from "./ProductoMock.js"

export function crearCarritoMock(){
    const productos = []
    for (let i = 0; i < faker.number.int({min: 1, max: 5}); i++) {
        productos.push(crearProductoMock().toCart())
    }
    const sum = productos.reduce((accumulator, object) => {
        return accumulator + object.price
    }, 0)
    // console.log(productos)
    return new DatosFuturoCarrito(productos,sum)
}