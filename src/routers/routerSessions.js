import {Router} from "express"
import { loginPostController, registerPostController } from "../controllers/api/sessionsPostController.js"

const routerSessions = Router()

routerSessions.post("/register", registerPostController)

routerSessions.post("/login", loginPostController)

routerSessions.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send({ status: "error", error: "Couldn't logout" })
        res.redirect('/login')
    })
})

export default routerSessions