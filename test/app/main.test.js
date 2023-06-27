import supertest from "supertest"
import chai, { assert } from "chai"
import mongoose from "mongoose"
import { MONGODB_CNX_STR } from "../../src/config/config.js"
import { app } from "../../src/main.js"

const serverBaseUrl = "localhost:8080/api"
const httpClient = supertest(serverBaseUrl)

const PORT = 9000
let server

const usuario = {
    email: "valengrassi7@gmail.com",
    password: "123"
}

const datosProducto = {
    title: "productoPrueba",
    price: 2000,
    stock: 10
}

describe("api rest del sistema", () => {

    describe("products", () => {
        it("First Login", async() => {
            await httpClient
            .post("/sessions/login")
            .send(usuario)
        })
        describe("POST", () => {
            it("crear un producto sin estar logueado da error 500", async() => {
                const {statusCode, ok, _body: {payload: creado}} = await httpClient.post("/products").send(datosProducto)
                // assert.ok(ok)
                assert.strictEqual(statusCode, 500)
            })
        })
        describe("GET", () => {
            it("ver los productos sin estar logueado da error 500", async() => {
                const {statusCode, ok, _body: {payload: creado}, error} = await httpClient.get("/products")
                console.log(statusCode)
                console.log(creado)
                console.log(ok)
                console.log(error)
            })
        })
        describe("PUT", () => {
            it("cambiar los productos sin estar logueado da error 500", async() => {
                const {statusCode} = await httpClient.put("/products/123456")
                assert.strictEqual(statusCode, 500)
            })
        })
        describe("DELETE", () => {
            it("eliminar los productos sin estar logueado da error 500", async() => {
                const {statusCode} = await httpClient.delete("/products/123456")
                assert.strictEqual(statusCode, 500)
            })
        })
    })
})