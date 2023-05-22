export const errores = {
    NOT_FOUND: "NOT_FOUND",
    INVALID_ARG: "INVALID_ARG",
    NOT_LOGGED_IN: "NOT_LOGGED_IN",
    EXISTING_MAIL: "EXISTING_MAIL",
    NOT_AUTHORIZED: "NOT_AUTHORIZED",
    INCORRECT_CREDENTIALS: "INCORRECT_CREDENTIALS"

}


export function errorHandler(error, req, res, next) {
    switch (error.message) {
        case error.NOT_FOUND:
            res.status(404).json({status: "error", description: "recurso no encontrado"})
            break;
        case error.INVALID_ARG:
            res.status(400).json({status: "error", description: "el argumento no posee el formato correcto"})
            break;
        case error.NOT_LOGGED_IN:
            res.status(401).json({status: "error", description: "no estas logueado"})
            break;
        case error.EXISTING_MAIL:
            res.status(403).json({status: "error", description: "el mail ya existe en la base de datos"})
            break;
        case error.NOT_AUTHORIZED:
            res.status(401).json({status: "error", description: "no estas autorizado para realizar esta accion"})
            break;
        case error.INCORRECT_CREDENTIALS:
            res.status(401).json({status:"error", description: "el mail o la contraseña son incorrectos"})
        default:
            res.status(500).json({status: "error", message: error.message});
        break;
    }
}
