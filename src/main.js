import express from "express"
import { apiRouter } from "./routers/apiRouter.js"
import mongoose from "mongoose"
import {engine} from "express-handlebars"
import { COOKIE_SECRET, PORT, MONGODB_CNX_STR } from "./config/config.js"
import cookieParser from "cookie-parser"
import routerViews from "./routers/routerViews.js";
import MongoStore from "connect-mongo"
import session from "express-session"
import { logger, winstonLogger } from "./utils/customLogger.js"
import { swaggerOptions } from "./utils/swaggerOptions.js"
import swaggerUi from "swagger-ui-express"
import swaggerJsdoc from "swagger-jsdoc"
import multer from "multer"


export const app = express()

app.engine("handlebars", engine({runtimeOptions: {allowProtoPropertiesByDefault: true}}))
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

app.use(logger)
const documents = multer.diskStorage({
    destination: "public/documents",
    filename: (req,file,next) => {
        next(null, file.originalname)
    }
})

const profile = multer.diskStorage({
    destination: "public/profiles",
    filename: (req,file,next) => {
        next(null, file.originalname)
    }
})

const products = multer.diskStorage({
    destination: "public/products",
    filename: (req,file,next) => {
        next(null, file.originalname)
    }
})

app.use(multer({
    storage: profile,products,documents,
}).fields(
    [
        {name:"profile"}, 
        {name: "document"}, 
        {name: "products"}
    ]
    ))

app.use("/api", apiRouter)
app.use("/", routerViews)
app.use("/rama", (req,res) => {
    res.send("Rama Quality Assurance!!!!!")
})

const specs = swaggerJsdoc(swaggerOptions)
app.use("/apidocs", swaggerUi.serve, swaggerUi.setup(specs))

await mongoose.connect(MONGODB_CNX_STR)
winstonLogger.info(`conectado a mongo en ${MONGODB_CNX_STR}`)
winstonLogger.http(`conectado al puerto ${PORT}`)

app.listen(PORT)
