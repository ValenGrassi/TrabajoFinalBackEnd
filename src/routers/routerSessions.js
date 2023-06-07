import {Router} from "express"
import { loginPostController, registerPostController, tokenPostController } from "../controllers/api/sessionsController.js"

const routerSessions = Router()

routerSessions.post("/register", registerPostController)

routerSessions.post("/login", loginPostController)

routerSessions.post("/resetToken", tokenPostController)

routerSessions.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send({ status: "error", error: "Couldn't logout" })
        res.redirect('/login')
    })
})

export default routerSessions