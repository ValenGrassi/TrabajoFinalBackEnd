import { userManager } from "../dao/usersManager.js"
import { DatosFuturoUsuario } from "../models/DatosFuturoUser.js"

class UserRepository{
    constructor(){}

    async guardar(personaBO){
        await userManager.guardar(personaBO)
        return personaBO
    }

    async encontrarUnoConValor(criterio,{returnDto} = {returnDto: false}){
        const dto = await userManager.encontrarUnoConValor(criterio)
        if(returnDto) return dto
        else return new DatosFuturoUsuario(dto)
    }
}

export const userRepository = new UserRepository(
    userManager
)