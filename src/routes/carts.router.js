import { Router } from "express";
import { agregar_producto_carrito, crear_carrito, traer_carrito_por_id } from "../controllers/carts.js";

const router = Router()

router.get('/:cid', traer_carrito_por_id)
router.post('/', crear_carrito)
router.post('/:cid/product/:pid', agregar_producto_carrito)

export default router 