import { userManager } from "../../dao/usersManager.js"
import { errores } from "../../errors/errorHandler.js"
import { userRepository } from "../../repositories/usersRepository.js"
import { usuariosService } from "../../services/users.service.js"
import { criptografiador } from "../../utils/criptografia.js"

export async function postUsers(req, res,next){
    const {username,password} = req.body
    const user = await usuariosService.registrar({username, password})
    const token = criptografiador.generarToken(user)
    res.cookie("authToken", token, {expiresIn: "1h", httpOnly: true})
    res.status(201).json(user)
}

export async function getUsers(req,res,next){
    try {
        const users = await userManager.encontrar()
        console.log(users)
        const usersReturn = users.map(user => {
            return {
                username: user.nombre,
                mail: user.email,
                rol: user.rol,
            }
        
        })
        return res.status(200).json(usersReturn)
    } catch (error) {
        next(error)
    }
}

export async function putUsers(req,res,next){
    try {
        console.log(req.body)
        const actualizado = await usuariosService.actualizarContrasenia(req.body)
        res.status(201).json(actualizado)
    } catch (error) {
        next(error)
        req.logger.fatal(error)
    }
}

export async function premiumUsers(req,res,next){
    try {
        const idBuscado = req.params.uid;
        const user = await userRepository.encontrarUnoConValor({_id:idBuscado}, {returnDto: true})
        if(!user){
            throw new Error(errores.INCORRECT_CREDENTIALS)
        }
        if(user.rol == "usuario" && user.documents){
            user.rol = "premium"
        }else if(user.rol == "premium"){
            user.rol = "usuario"
        } else {
            throw new Error("el perfil no tiene ningun documento")
        }
        console.log(user)
        const userCambiado = await userRepository.actualizarUnoConValor({_id:idBuscado}, user, {returnDto: true})
        res.status(201).send(`${user.email} cambió de rol`)
    } catch (error) {
        next(error)
    }
}

export async function postDocuments(req,res,next){
    try {
        var files
        const user = req.session.user;
        if(req.files.document){ files = req.files.document[0] }
        if(req.files.profile){ files = req.files.profile[0]}
        if(req.files.product){ files = req.files.product[0]}
        const {originalname, path} = files
        const userCambiado = await usuariosService.actualizarDocumentos(user, originalname, path)
        res.status(201).send(`${user.email} subió un documento.`)
    } catch (error) {
        next(error)
        console.log(error)
    }
}

export async function deleteUsers(req,res,next){
    try {
        const users = await userManager.encontrar()
        const usuariosActivos = await usuariosService.eliminarUsuariosViejos(users)
        await userManager.actualizarColeccion(usuariosActivos)
        return res.status(200).json(usuariosActivos)
    } catch (error) {
        next(error)
        console.log(error)
    }
}