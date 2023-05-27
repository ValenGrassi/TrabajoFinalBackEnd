import winston from "winston"
import { NODE_ENV } from "../config/config.js"

const levels = {
    debug: 5,
    http: 4,
    info: 3,
    warning: 2,
    error: 1,
    fatal: 0
}

let transports

if(NODE_ENV === "production"){
    transports = [
        new winston.transports.File({
            level: "error",
            filename: "errors.log"
        }),
        new winston.transports.Console({
            level: "info"
        })
    ]
} else {
    transports = [
        new winston.transports.Console({
            level: "debug"
        })
    ]
}

export const winstonLogger = winston.createLogger({
    levels: levels, 
    transports: transports
})

export const logger = (req,res,next) => {
    req.logger = winstonLogger
    req.logger.info(`${req.method} en ${req.url} - ${new Date().toLocaleDateString()}`)
    next()
}