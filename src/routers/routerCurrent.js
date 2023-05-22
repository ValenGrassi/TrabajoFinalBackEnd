import { Router } from "express";
import { currentGetController } from "../controllers/api/currentGetController.js";
import { Administrador, Usuario } from "../middlewares/autorizacion.js";


export const routerCurrent = Router();

routerCurrent.get("/administrador", Administrador , currentGetController)
routerCurrent.get("/usuario",Usuario, currentGetController)

