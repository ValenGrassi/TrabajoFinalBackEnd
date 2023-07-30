import { errores } from "../../errors/errorHandler.js"
import { DatosFuturoUsuario } from "../../models/DatosFuturoUser.js"
import { userRepository } from "../../repositories/usersRepository.js"
import { authenticationService } from "../../services/auth.service.js"
import { sessionsService } from "../../services/sessions.service.js"
import { usuariosService } from "../../services/users.service.js"

export async function registerPostController(req, res, next) {
    try {
        const fecha = new Date().toLocaleDateString()
       
        const existe = await sessionsService.verificarExistenciaUsuario(req.body.email)
        req.logger.error(existe)

        if(existe !== null){
            return new Error(errores.EXISTING_MAIL)
        }

        const datosFuturoUsuario = new DatosFuturoUsuario(req.body).toDto()
        req.logger.info(datosFuturoUsuario)
        datosFuturoUsuario.last_connection = fecha
        
        await usuariosService.registrar(datosFuturoUsuario)

        return res.status(201).send({status: "success", message: "Usuario Registrado!"})
    }
    catch (error) {
        next(error);
    }
}

export async function loginPostController(req,res,next){
    try {
        const {email,password} = req.body
        const rol = "admin"
        const user = await userRepository.encontrarUnoConValor({email}, { returnDto: true })
        if(user){
            try {
                const usuarioLogueado = await authenticationService.login(email,password)
                if(usuarioLogueado){req.session.user = {
                name: `${user.nombre} ${user.apellido}`,
                email: user.email,
                age: user.edad,
                rol: user.rol}
                req.logger.info("rol del usuario: " + user.rol)
                usuariosService.actualizarUltimaVez(req.session.user)
                res.sendStatus(201)}
            } catch (error) {
                res.status(401).json({status:"error", description: "el mail o la contraseña son incorrectos"})
            }
        }

        if(!user && email == "adminCoder@coder.com" && password == "adminCod3r123"){
            req.session.user = {
            name: "coderhouse",
            email: email,
            password: password,
            rol: rol,
            }
            req.logger.info("rol del usuario: " + rol)
        }
    } catch (error) {
        res.status(401).json({status:"error", description: "el mail o la contraseña son incorrectos"})
        req.logger.fatal(error)
    }
}

export async function tokenPostController(req,res,next){
    try {
        const creado = await usuariosService.obtenerTokenParaReestablecerContrasenia(req.body)
        res.status(201).send(creado)
    } catch (error) {
        next(error)
    }
}

export async function logoutController(req, res){
    const user = req.session.user
    await usuariosService.actualizarUltimaVez(user)
    req.session.destroy(err => {
        if (err) return res.status(500).send({ status: "error", error: "Couldn't logout" })
        res.redirect('/login')
    })
}