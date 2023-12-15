import productModel from "../models/product.model.js";


export const traer_productos = async (req, resp)=>{
    try{
        //const {limit} = req.query
        //const limite = limit && !isNaN(Number(limit)) ? Number(limit) : undefined
        //const productos = limite ? await productModel.find().limit(limite) : await productModel.find() para insomnia
        //const productos = limite ? await productModel.find().lean().limit(limite) : await productModel.find().lean()
        const filtro_categoria = req.query?.category ?? ''
        const filtro_stock = req.query?.stock
        const page = parseInt(req.query?.page ?? 1)
        const limit = parseInt(req.query?.limit ?? 10)
        const ordenar_por = req.query?.sort === '↑' ? 1 : -1
        let propiedad_filtro = req.query?.query
        let filtros = {}

        if (propiedad_filtro) {
            try {
                propiedad_filtro = JSON.parse(decodeURIComponent(propiedad_filtro))
                filtros = { ...filtros, ...propiedad_filtro }

            } catch (error) {
                console.error("Error al parsear la query:", error);
            }
        }
        
        if (filtro_stock) {
            filtros.stock = { $gt: 0 } //que sea mayor a 0
        
        }
        if (filtro_categoria !== '') {
            filtros.category = filtro_categoria
        }
        
        
        const productos = await productModel.paginate(filtros, {
            page,
            limit,
            sort: {price : ordenar_por},
            lean: true,
            leanWithId: false
        })

        if(!productos || productos.length === 0){
            resp.status(404).json({mensaje: "error al traer los productos de la base de datos."})
        }
        else{
            productos.products = productos.docs
            delete productos.docs
            //return resp.json({ productos }) para insomnia
            return resp.render('products',  { productos: productos.products} ) /*para que el handlebars recibe el array y no el objeto.*/
        }

    }catch(error){
        console.log("fallo la funcion traer_productos en controllers/pro0ducts.js por el error:\n", error)
        resp.status(500).json({data_error: error})
    }
}

export const traer_producto_por_id = async (req, resp)=>{
    try{
        const { pid } = req.params
        //const producto = await productModel.findById(pid) para insomnia
        const producto = await productModel.findById(pid).lean()

        if(!producto){
            return resp.status(404).json({mensaje: `no hay ningun producto con el ID: ${pid}`})
        }
        else{
            //return resp.json({ producto }) para insomnia
            return resp.render('productbyid', {producto})
        }

    }catch(error){
        console.log("fallo la funcion traer_producto_por_id en controllers/products.js por el error:\n", error)
        resp.status(500).json({data_error: error})
    }
}

export const agregar_producto = async (req, resp)=>{
    try{
        const {title, description, category, stock, price, code, thumbnail} = req.body
        const thumbnail_en_Array = Array.isArray(thumbnail) ? thumbnail : [thumbnail]

        if(!title, !description, !category, !stock, !price, !code){
            return resp.status(404).json({mensaje : "Uno de los campos no fue cargado de manera correcta"})
        }
        else{
            const producto_nuevo = await productModel.create({title, description, category, stock, price, code, thumbnail: thumbnail_en_Array})
            
            //return resp.json({producto_nuevo}) para insomnia
            return resp.redirect('/products')
        }
    }
    catch(error){
        console.log("fallo la funcion agregar_producto en controllers/products.js por el error:\n", error)
        resp.status(500).json({data_error: error})
    }
}

export const eliminar_producto = async (req, resp)=>{
    try{
        const { pid } = req.params
        const producto = await productModel.findByIdAndDelete(pid)

        if(!producto){
            return resp.status(404).json({mensaje: `no hay ningun producto con el ID: ${pid}`})
        }
        else{
            return resp.json({ mensaje: `producto eliminado:\n${producto}` })
        }
    }
    catch(error){
        console.log("fallo la funcion eliminar_producto en controllers/products.js por el error:\n", error)
        resp.status(500).json({data_error: error})
    }
}

export const actualizar_producto = async (req, resp)=>{
    try{
        const {pid} = req.params
        const {_id, ...todas_menos_id} = req.body
        const producto_nuevo = await productModel.findByIdAndUpdate(pid, { ...todas_menos_id }, {new : true})

        if(!producto_nuevo){
            return resp.status(404).json({mensaje: "no se pudo actualizar el producto."})
        }
        else{
            return resp.json({mensaje: `producto actualizado:\n${producto_nuevo}`})
        }
    }
    catch(error){
        console.log("fallo la funcion actualizar_producto en controllers/products.js por el error:\n", error)
        resp.status(500).json({data_error: error})
    }
}
export const renderizar_agregar_producto = (req, resp)=>{
    resp.render('addproduct')
}
