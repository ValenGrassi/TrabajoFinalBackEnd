import { Router } from "express";
import { getUsers, postUsers, premiumUsers, putUsers } from "../controllers/api/usersController.js";

export const routerUsers = Router()
routerUsers.post("/", postUsers)
routerUsers.get("/", getUsers)
routerUsers.put("/", putUsers)
routerUsers.post("/premium/:uid", premiumUsers)
