import express from "express"
import { apiRouter } from "./routers/apiRouter.js"
import mongoose from "mongoose"
import {engine} from "express-handlebars"
// import routerWeb from "./routers/routerWebs.js";
import { COOKIE_SECRET, PORT, MONGODB_CNX_STR } from "./config/config.js"
import cookieParser from "cookie-parser"
import routerViews from "./routers/routerViews.js";
import MongoStore from "connect-mongo"
import session from "express-session"


export const app = express()

app.engine("handlebars", engine())
app.set("views", "./views")
app.set("view engine", "handlebars")
app.use(express.static("public"))

app.use(session({
    store: new MongoStore({
        mongoUrl: MONGODB_CNX_STR,
        ttl: 3600
    }),
    secret: "secretito",
    resave: false,
    saveUninitialized: false
}))

app.use(cookieParser(COOKIE_SECRET))

app.use("/api", apiRouter)
app.use("/", routerViews)


await mongoose.connect(MONGODB_CNX_STR)

app.listen(PORT, () => {console.log(`conectado a ${PORT}`)})
