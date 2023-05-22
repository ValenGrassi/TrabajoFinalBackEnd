import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config/config.js"

class Criptografia {
    hashear(dato){
        return bcrypt.hashSync(dato, 10)
    }

    comparar(actual,almacenada){
        return bcrypt.compareSync(actual, almacenada)
    }

    generarToken(dato) {
        jwt.sign(dato, JWT_SECRET, {expiresIn: "1h"})
    }

    decodificarToken(token) {
        return jwt.verify(token, JWT_SECRET)
    }
}

export const criptografiador = new Criptografia()