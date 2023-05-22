import {criptografiador} from "../utils/criptografia.js"

export function autenticacionRedirect (req,res,next){
    const token = req.signedCookies.authToken
    const user = criptografiador.decodificarToken(token)
    if(!user.password && !req.session.user) return res.redirect("/login")
    next()
}

export function autenticacionLogin(req,res,next){
    const user = req.session.user
    if(!user) return res.redirect("/login")
    next()
}

