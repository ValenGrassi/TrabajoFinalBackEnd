import { faker } from "@faker-js/faker"
import { DatosFuturoProducto } from "../models/DatosFuturoProducto.js"

export function crearProductoMock(){
    return new DatosFuturoProducto({
        title: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        price: faker.number.int({ min:1, max:100 }),
        stock: faker.number.int({ min:1, max:100 }),
        _id: faker.string.uuid()
    })
}