import { Router } from "express";
import productModel from "../models/product.model.js";

const router = Router()

router.get('/products', async (req, resp)=>{

    const limit = parseInt(req.query?.limit ?? 4)
    const page = parseInt(req.query?.page ?? 1)

    const result = await productModel.paginate({}, {
        page,
        limit,
        lean: true
    })

    console.log(result)
    result.products = result.docs
    delete result.docs
    resp.render('products', result)
})

export default router