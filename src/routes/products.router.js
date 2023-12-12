import { Router } from "express";
import { actualizar_producto, agregar_producto, eliminar_producto, renderizar_agregar_producto, traer_producto_por_id, traer_productos } from "../controllers/products.js";


const router = Router()

router.get('/', traer_productos)
router.get('/add', renderizar_agregar_producto)
router.post('/add', agregar_producto)
router.get('/:pid', traer_producto_por_id)
router.delete('/:pid', eliminar_producto)
router.put('/:pid', actualizar_producto)
//VIEJO:

/*

router.get('/products', async (req, resp)=>{

    try{

        const limit = parseInt(req.query?.limit ?? 4)
        const page = parseInt(req.query?.page ?? 1)
        const ordenar_por = req.query?.sort === 'desc' ? -1 : 1
        const filtro_categoria = req.query?.category ?? ''
        const filtro_stock = req.query?.stock

        const filtros = {}
        
        if (filtro_categoria !== '') {
            filtros.category = req.query.category
        }

        if (filtro_stock) {
            filtros.stock = { $gt: 0 } //que sea mayor a 0
        }

        const result = await productModel.paginate(filtros, {
            page,
            limit,
            sort: { price: ordenar_por },
            lean: true
        })

        console.log(result)
        result.products = result.docs
        delete result.docs
        resp.render('products', result)
    }

    catch(error) {
        console.error('Error al recuperar productos:', error);
        resp.status(500).json({ error: 'Error interno del servidor' });
    }
})
*/
export default router