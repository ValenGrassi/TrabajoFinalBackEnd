import mongoose from "mongoose";
import { MONGODB_CNX_STR } from "../config/config.js";
import { crearCarritoMock } from "../mocks/CarritoMock.js";
import { crearProductoMock } from "../mocks/ProductoMock.js";
import { crearUsuarioMock } from "../mocks/UsuarioMock.js";

await mongoose.connect(MONGODB_CNX_STR)

const usuarios = []
for (let i = 0; i < 50; i++) {
    usuarios.push(crearUsuarioMock().toDto())
}
mongoose.connection.collection("users").insertMany(usuarios)

// const productos = []
// for (let i = 0; i < 50; i++) {
//     productos.push(crearProductoMock())
// }
// mongoose.connection.collection("products").insertMany(productos)

// const carritos = []
// for (let i = 0; i < 50; i++) {
//     carritos.push(crearCarritoMock())
// }
// mongoose.connection.collection("carts").insertMany(carritos)


mongoose.disconnect