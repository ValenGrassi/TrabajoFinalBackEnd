import { resetTokensManager } from "../dao/resetTokenManager.js";
import { errores } from "../errors/errorHandler.js";
import { ResetToken } from "../models/ResetToken.js";
import { userRepository } from "../repositories/usersRepository.js";
import { criptografiador } from "../utils/criptografia.js";
import { emailService } from "./email.service.js";

class UsuariosService{

    async obtenerTokenParaReestablecerContrasenia(mailUsuario){
        const usuario = await userRepository.encontrarUnoConValor(mailUsuario, {returnDto: true})
        console.log(usuario)
        const idUsuario = usuario._id
        // console.log({idUsuario})
        const token = criptografiador.generarToken({idUsuario}, "1hr")
        // await emailService.send(usuario.email, "reestablecimiento de contraseña", token)
        console.log(token) //usar el token de consola para reestablecerla
        const resetToken = new ResetToken({idUsuario, token})
        resetTokensManager.guardar(resetToken)
    }

    async registrar(datosFuturoUsuario){
    const usuarioRegistrado = await userRepository.guardar(datosFuturoUsuario);
    console.log(usuarioRegistrado)
    return usuarioRegistrado;
    }

    async actualizarContrasenia({password, token}){
        let resetToken
        try {
            resetToken = await resetTokensManager.encontrarUnoConValor({token})
        } catch (error) {
            throw new Error(errores.NOT_AUTHORIZED)
        }

        try {
            criptografiador.decodificarToken(token)
        } catch (error) {
            throw new Error(errores.NOT_AUTHORIZED)
        }


        if(token != resetToken.token){
            throw new Error(errores.NOT_AUTHORIZED)
        }

        const usuario = await userRepository.encontrarUnoConValor({_id: resetToken.idUsuario}, {returnDto: true})

        if(criptografiador.comparar(password, usuario.password)){
            throw new Error("la contraseña debe ser distinta a la existente")
        }
        
        const hasheado = criptografiador.hashear(password)
        usuario.password = hasheado
        const actualizado = await userRepository.actualizarUnoConValor({_id: resetToken.idUsuario}, usuario,  { returnDto: true })
        console.log(actualizado)
        return actualizado
    }

    async actualizarUltimaVez(user){
        const fecha = new Date().toLocaleDateString()
        user.last_connection = fecha
        const actualizado = await userRepository.actualizarUnoConValor({email: user.email}, user, {returnDto: true})
        return actualizado
    }

    async actualizarDocumentos(user, name, link){
        const userDTO = await userRepository.encontrarUnoConValor({email: user.email}, {returnDto: true})
        if(userDTO.documents){
            userDTO.documents.push({name: name, reference: link})
        } else{
            userDTO.documents = []
            userDTO.documents.push({name: name, reference: link})
        }
        console.log(userDTO)
        const actualizado = await userRepository.actualizarUnoConValor({email: user.email}, userDTO, {returnDto: true})
        return actualizado
    }
}

export const usuariosService = new UsuariosService()