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

export function UsuarioPremium(req,res,next){
    const user = req.session.user
    if(user.rol != "usuario" && user.rol != "premium"){
        throw new Error(errores.NOT_AUTHORIZED)
    } 
}

export function Premium(req,res,next){
    const user = req.session.user
    if(user.rol != "admin" && user.rol != "premium"){
        throw new Error(errores.NOT_AUTHORIZED)
    }
}