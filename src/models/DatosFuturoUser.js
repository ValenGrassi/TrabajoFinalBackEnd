import { criptografiador } from "../utils/criptografia.js"

function validarEdad(valor){
    const valorNumero = parseInt(valor)
    if(Number(valorNumero) <= 0) throw new Error("la edad es un numero positivo mayor a cero")
    return Number(valorNumero)
}

export class DatosFuturoUsuario {
    #password
    #edad
    #email
    #nombre
    #apellido
    #rol
    
    constructor({firstName, lastName, email, age, password,rol}) {
        this.#nombre = firstName
        this.#apellido = lastName
        this.#email = email
        this.#edad = age
        this.#password = criptografiador.hashear(password)
        this.#rol = rol
    }

    get password() {return this.#password}
    get edad(){return this.#edad}
    get email(){return this.#email}

    set edad(valor){
        if(!valor) throw new Error("la edad debe ser un valor definido")
        if(typeof valor !== "number") throw new Error("la edad debe ser numerica")
        if(!Number.isInteger(valor)) throw new Error("la edad debe ser entera")
        if(valor < 0) throw new Error("la edad debe ser positiva")
        this.#edad = valor
   }

   toDto(){
    return {
        nombre: this.#nombre ,
        apellido: this.#apellido ,
        email: this.#email ,
        edad: this.#edad ,
        password: this.#password ,
        rol: this.#rol
    }
}
}
