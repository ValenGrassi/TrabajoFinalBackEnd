import { userRepository } from "../repositories/usersRepository"

class SessionsService{
    async verificarExistenciaUsuario(email){
        const existe = await userRepository.encontrarUnoConValor({email:email}, { returnDto: true })
        return existe
    }
}

export const sessionsService = new SessionsService()