import { faker } from "@faker-js/faker"

function validarTitulo(valor){
    if(typeof valor != "string") throw new Error("el titulo es una cadena de caracteres")
    if(!valor) throw new Error("el titulo no puede estar vacio")
    return valor
}

function validarDescripcion(valor){
    if(typeof valor != "string") throw new Error("la descripción es una cadena de caracteres")
    if(!valor) throw new Error("la descripción no puede estar vacio")
    return valor
}

function validarCategoria(valor){
    if(typeof valor != "string") throw new Error("la categoría es una cadena de caracteres")
    if(!valor) throw new Error("la categoría no puede estar vacio")
    return valor
}

function validarThumbnail(valor){
    if(typeof valor != "string") throw new Error("el thumbnail es una cadena de caracteres")
    if(!valor) throw new Error("el thumbnail no puede estar vacio")
    return valor
}

function validarPrecio(valor){
    if(Number(valor) <= 0) throw new Error("el precio es un numero positivo mayor a cero")
    return Number(valor)
}

function validarCodigo(valor){
    if(typeof valor != "number") throw new Error("el codigo es un numero")
    if(!Number.isInteger(Number(valor))) throw new Error("el codigo es un numero entero")
    if(Number(valor) <= 0) throw new Error("el codigo es un numero positivo mayor a cero")
    return Number(valor)
}

function validarStock(valor){
    if(!Number.isInteger(Number(valor))) throw new Error("el stock es un numero entero")
    if(Number(valor) <= 0) throw new Error("el stock es un numero positivo mayor a cero")
    return Number(valor)
}

export class DatosFuturoProducto{
    constructor({status = true,thumbnail = "sin imagen",title,description ="sin descripcion",price,code=faker.number.int({min: 100, max: 1000}),stock,category="sin categoria", owner="admin"}){
        this.status = status
        this.thumbnail = validarThumbnail(thumbnail)
        this.title = validarTitulo(title)
        this.description = validarDescripcion(description)
        this.price = validarPrecio(price)
        this.code = validarCodigo(code)
        this.stock = validarStock(stock)
        this.category = validarCategoria(category)
        this.owner = owner
    }

    toCart(){
        return {
            title: this.title ,
            stock: this.stock ,
            price: this.price ,
        }
    }
}

