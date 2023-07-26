import { Router } from "express";
import { deleteUsers, getUsers, postDocuments, postUsers, premiumUsers, putUsers } from "../controllers/api/usersController.js";
import multer from "multer";

const profile = multer({ dest: 'public/profiles' })
const products = multer({ dest: 'public/products' })
const documents = multer({ dest: 'public/documents' })

export const routerUsers = Router()
routerUsers.post("/", postUsers)
routerUsers.post("/:uid/documents", documents.single('document'), profile.single("profile"), products.single("product"), postDocuments)
routerUsers.get("/", getUsers)
routerUsers.put("/", putUsers)
routerUsers.get("/premium/:uid", premiumUsers)
routerUsers.delete("/", deleteUsers)
