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

    generarToken(dato, ttl = "24h") {
        try {
            const payload = jwt.sign(dato, JWT_SECRET, {expiresIn: ttl})
            return payload
        } catch (error) {
            next(error)
        }
    }

    decodificarToken(token) {
        try {
            const payload = jwt.verify(token, JWT_SECRET)
            return payload["dato"]
        } catch (error) {
            throw new Error("expirado")
        }
    }
}

export const criptografiador = new Criptografia()