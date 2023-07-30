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
        const usersReturn = await usuariosService.getUsersService()
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
        const usuarioCambiado = usuariosService.premiumUsersService(req.params.uid)
        res.status(201).send(`${usuarioCambiado.email} cambió de rol`)
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
        const usuariosActivos = await usuariosService.eliminarUsuariosViejos()
        return res.status(200).json(usuariosActivos)
    } catch (error) {
        next(error)
        console.log(error)
    }
}