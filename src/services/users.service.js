import { userRepository } from "../repositories/usersRepository.js";

class UsuariosService{
    async registrar(datosFuturoUsuario){
    const usuarioRegistrado = await userRepository.guardar(datosFuturoUsuario);
    console.log(usuarioRegistrado)
    return usuarioRegistrado;
    }
}

export const usuariosService = new UsuariosService()