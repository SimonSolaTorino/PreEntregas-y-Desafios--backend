import { Router } from "express";
import { error, log_out, mostrar_login, mostrar_registro, traer_login, traer_registro } from "../controllers/login.js";
import passport from "passport";

const router = Router()


router.get('/login', mostrar_login)
router.post('/login', passport.authenticate('login',{failureRedirect:'login'}), traer_login)
router.get('/register', mostrar_registro)
router.post('/register', passport.authenticate('register',{failureRedirect:'register'}), traer_registro)
router.get('/logout', log_out)
router.get('/github', passport.authenticate('github', {scope:['user:email']}), error)
router.get('/githubcallback', passport.authenticate('github', {failureRedirect:'register'}), traer_login)
export default router