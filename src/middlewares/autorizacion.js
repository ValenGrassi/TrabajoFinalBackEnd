import { errores } from "../errors/errorHandler.js"

export function Administrador(req,res,next){
    const user = req.session.user
    if(user.rol != "admin"){
        throw new Error(errores.NOT_AUTHORIZED)
    }
    next()
}

export function Usuario(req,res,next){
    const user = req.session.user
    if(user.rol != "usuario"){
        throw new Error(errores.NOT_AUTHORIZED)
    }
    next()
}