import {faker} from "@faker-js/faker"
import { DatosFuturoUsuario } from "../models/DatosFuturoUser.js";

export function crearUsuarioMock(){
    return new DatosFuturoUsuario({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        age: faker.number.int({ min:1, max:100 }),
        password: faker.internet.password(),
        rol: "usuario"
    })
}
