import {Router} from "express"
import { loginPostController, logoutController, registerPostController, tokenPostController } from "../controllers/api/sessionsController.js"

const routerSessions = Router()

routerSessions.post("/register", registerPostController)
routerSessions.post("/login", loginPostController)
routerSessions.post("/resetToken", tokenPostController)
routerSessions.get('/logout', logoutController)

export default routerSessions