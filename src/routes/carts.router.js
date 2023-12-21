import { Router } from "express";
import { actualizar_cantidad_producto_carrito, agregar_producto_carrito, crear_carrito, eliminar_producto_carrito, traer_carrito_por_id, vaciar_carrito } from "../controllers/carts.js";
import { auth } from "../midleware/auth.js";

const router = Router()

router.get('/:cid', auth, traer_carrito_por_id)
router.post('/', crear_carrito)
router.post('/:cid/product/:pid', agregar_producto_carrito)
router.delete('/:cid/products/:pid', eliminar_producto_carrito)
router.put('/:cid/products/:pid', actualizar_cantidad_producto_carrito)
router.put('/:cid', vaciar_carrito)

export default router 