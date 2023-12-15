import cartModel from "../models/cart.model.js"; 

export const traer_carrito_por_id = async (req, resp)=>{
    try{
        const { cid } = req.params
        const carrito = await cartModel.findById(cid)

        if(!carrito){
            return resp.status(404).json({mensaje: `No se encontro ningun carrito con el id: ${cid}`})
        }
        else{
            //return resp.json({carrito}) para insomnia
            const carritoSimple = carrito.toObject()
            return resp.render('cart',  { carrito: carritoSimple })
        }
    }
    catch(error){
        console.log("fallo la funcion traer_carrito_por_id en controllers/carts.js por el error:\n", error)
        resp.status(500).json({data_error: error})
    }
}

export const crear_carrito = async (req, resp)=>{
    try{
        const nuevo_carrito = await cartModel.create({})
        return resp.json({mensaje: `Carrito creado con exit: ${nuevo_carrito}`})
    }
    catch(error){
        console.log("fallo la funcion crear_carrito en controllers/carts.js por el error:\n", error)
        resp.status(500).json({data_error: error})
    }
}

export const agregar_producto_carrito = async (req, resp)=>{
    try{
        const {cid, pid} = req.params
        const carrito = await cartModel.findById(cid)

        if(!carrito){
            return resp.status(404).json({mensaje: `No se encontro ningun carrito con el id: ${cid}`})
        }
        else{
            const producto_en_carrito = carrito.products.find(producto => producto.id.toString() === pid)

            if(producto_en_carrito){
                producto_en_carrito.quantity += 1
            }
            else{
                carrito.products.push({id: pid, quantity: 1})
            }

            carrito.save()
            return resp.json({mensaje: `Producto cargado en el carrito:${carrito}`})
        }

    }
    catch(error){
        console.log("fallo la funcion agregar_producto_carrito en controllers/carts.js por el error:\n", error)
        resp.status(500).json({data_error: error})
    }
}