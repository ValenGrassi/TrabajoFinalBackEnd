import {Router} from "express"
import { cartsViewController, dashViewController, loginViewController, productsViewController, recuperarViewController, registerViewController, tokenViewController, userViewControler } from "../controllers/api/viewsController.js";
import { autenticacionLogin, autenticacionRedirect } from "../middlewares/autenticacion.js";

const routerViews = Router()

routerViews.get("/registro", registerViewController)

routerViews.get("/login", loginViewController)

routerViews.get("/token", tokenViewController)

routerViews.get("/recuperar", recuperarViewController)

routerViews.get("/", autenticacionRedirect, dashViewController)

routerViews.get("/user",autenticacionLogin, userViewControler)

routerViews.get("/realtimeproducts",autenticacionRedirect, productsViewController)

routerViews.get("/cart", autenticacionRedirect, cartsViewController)

export default routerViews