import {Router} from "express"
import { loginPostController, registerPostController, tokenPostController } from "../controllers/api/sessionsController.js"
import { usuariosService } from "../services/users.service.js"

const routerSessions = Router()

routerSessions.post("/register", registerPostController)

routerSessions.post("/login", loginPostController)

routerSessions.post("/resetToken", tokenPostController)

routerSessions.get('/logout', async (req, res) => {
    const user = req.session.user
    await usuariosService.actualizarUltimaVez(user)
    req.session.destroy(err => {
        if (err) return res.status(500).send({ status: "error", error: "Couldn't logout" })
        res.redirect('/login')
    })
})

export default routerSessions