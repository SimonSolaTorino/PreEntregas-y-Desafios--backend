import { Router } from "express";
import { log_out, mostrar_login, mostrar_registro, traer_login, traer_registro } from "../controllers/login.js";

const router = Router()


router.get('/login', mostrar_login)
router.post('/login', traer_login)
router.get('/register', mostrar_registro)
router.post('/register', traer_registro)
router.get('/logout', log_out)

export default router