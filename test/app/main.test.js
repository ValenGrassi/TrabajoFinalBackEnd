import supertest from "supertest"
import chai, { assert } from "chai"
import mongoose from "mongoose"
import { MONGODB_CNX_STR } from "../../src/config/config.js"
import { app } from "../../src/main.js"

const serverBaseUrl = "localhost:8080/api"
const httpClient = supertest.agent(serverBaseUrl)

const PORT = 9000
let server

const firstProduct = {
    _id: '646bae4be454e2dfe1c99ecc',
    status: true,
    thumbnail: 'sin imagen',
    title: 'Chair',
    description: 'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive',
    price: 8,
    code: 897,
    stock: 78,
    category: 'sin categoria'
  }

const usuario = {
    email: "valengrassi7@gmail.com",
    password: "123456"
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
            it("crear un producto siendo usuario da error 500", async() => {
                const {statusCode} = await httpClient.post("/products").send(datosProducto)
                assert.strictEqual(statusCode, 500)
            })
        })
        describe("GET", () => {
            it("si estas logueado como usuario podes recibir productos", async() => {
                const {statusCode, ok, _body} = await httpClient.get("/products")
                assert.strictEqual(statusCode, 201)
                assert.ok(ok, "la petición no fue exitosa")
                const primerProducto = _body[0]
                assert.deepEqual(primerProducto, firstProduct)
            })
        })
        describe("PUT", () => {
            it("cambiar los productos siendo usuario da error 500", async() => {
                const {statusCode} = await httpClient.put("/products/123456")
                assert.strictEqual(statusCode, 500)
            })
        })
        describe("DELETE", () => {
            it("eliminar los productos siendo usuario da error 500", async() => {
                const {statusCode} = await httpClient.delete("/products/123456")
                assert.strictEqual(statusCode, 500)
            })
        })
    })
    describe("carts", () => {
        it("First Login", async() => {
            await httpClient
            .post("/sessions/login")
            .send(usuario)
        })
        describe("")
    })
})

