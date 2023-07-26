import {criptografiador} from "../utils/criptografia.js"

export async function autenticacionRedirect (req,res,next){
    const token = req.signedCookies.authToken
    var user
    if(token){
       user = await criptografiador.decodificarToken(token)
    } else user = req.session.user
    if(!user && !req.session.user) return res.redirect("/login")
    next()
}

export function autenticacionLogin(req,res,next){
    const user = req.session.user
    console.log(user)
    if(!user) return res.redirect("/login")
    next()
}

