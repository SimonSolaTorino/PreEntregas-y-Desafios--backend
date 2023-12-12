import { Router } from "express";
import productModel from "../models/product.model.js";
const router = Router()

router.get('/', async (req, resp)=>{
    const productos = await productModel.find()
    //console.log(`respuesta:\n${productos}`)
    return resp.render('home', {productos})
})

//para socket
router.get('/realtimeproducts', (req, resp)=>{
    return resp.render('realTimeProducts', {})
})

export default router