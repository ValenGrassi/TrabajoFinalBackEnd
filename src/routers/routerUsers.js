import { Router } from "express";
import { postUsers } from "../controllers/api/usersPostController.js";

export const routerUsers = Router()
routerUsers.post("/", postUsers)
