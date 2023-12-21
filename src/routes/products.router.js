import { Router } from "express";
import { actualizar_producto, agregar_producto, eliminar_producto, renderizar_agregar_producto, traer_producto_por_id, traer_productos } from "../controllers/products.js";
import { admin, auth } from "../midleware/auth.js";


const router = Router()

router.get('/', auth, traer_productos)
router.get('/add', [auth, admin],renderizar_agregar_producto)
router.post('/add', agregar_producto)
router.get('/:pid', auth, traer_producto_por_id)
router.delete('/:pid', eliminar_producto)
router.put('/:pid', actualizar_producto)
export default router