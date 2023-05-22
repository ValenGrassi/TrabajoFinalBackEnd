import { usuariosService } from "../../services/users.service.js"
import { criptografiador } from "../../utils/criptografia.js"

export async function postUsers(req, res,next){
    const {username,password} = req.body
    const user = await usuariosService.registrar({username, password})
    const token = criptografiador.generarToken(user)
    res.cookie("authToken", token, {expiresIn: "1h", httpOnly: true})
    res.status(201).json(user)

}