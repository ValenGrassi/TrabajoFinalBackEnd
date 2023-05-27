import { json, Router } from "express";
import express from "express";
import { errorHandler } from "../errors/errorHandler.js";
import { routerCarts } from "./routerCarts.js";
import { routerProducts } from "./routerProducts.js"
import { routerUsers } from "./routerUsers.js";
import routerSessions from "./routerSessions.js";
import { routerCurrent } from "./routerCurrent.js";
import { routerTests } from "./routerTests.js";


export const apiRouter = Router();

apiRouter.use(json())
apiRouter.use(express.urlencoded({extended:true}))


apiRouter.use("/products", routerProducts)
apiRouter.use("/carts", routerCarts)
apiRouter.use("/users", routerUsers)
apiRouter.use("/sessions", routerSessions)
apiRouter.use("/current", routerCurrent)
apiRouter.use("/", routerTests)

apiRouter.use(errorHandler);