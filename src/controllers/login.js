import usersModel from "../models/users.model.js";
import { contraseña_valida, crear_hash } from "../utils/bcrypt.js";

export const mostrar_login = async (req, resp)=>{
    return resp.render('login')
}

export const mostrar_registro = async (req, resp)=>{
    return resp.render('register')
}

export const traer_registro = async (req, resp)=>{
    try{
        const {password, confirmPassword, email, name, lastname} = req.body

        if(password !== confirmPassword){
            return resp.redirect('register')
        }
        else{
            const password_hasheada = crear_hash(password)
            let usuario = await usersModel.findOne({email})
            
            if(!usuario){
                console.log(password, email, name, lastname)

                const usuario_nuevo = await usersModel.create({
                    name: name,
                    lastname: lastname,
                    email: email,
                    password: password_hasheada
                })

                usuario = usuario_nuevo

                const fullname_usuario = `${usuario.name} ${usuario.lastname}`
                req.session.usuario = fullname_usuario
                req.session.rol = usuario.rol

                return resp.redirect('/')
            }
            else{
                return resp.json({mensaje: "ya existe un usuario con ese email."})
            }

        }
    }catch(error){
        console.log("fallo la funcion traer_registro en controllers/login.js por el error:\n", error)
        resp.status(500).json({data_error: error})
    }
}

export const traer_login = async (req, resp)=>{
    try{
        const {password, email} = req.body

        const usuario = await usersModel.findOne({email})
        const contra_usuario = contraseña_valida(password, usuario.password)

        if(usuario){
            if(contra_usuario == true){
                //console.log('login exitoso.')
                const fullname_usuario = `${usuario.name} ${usuario.lastname}`
                req.session.usuario = fullname_usuario
                req.session.rol = usuario.rol
                return resp.redirect('/')
            }
        }
        else{
            console.log(password, email)
            
            return resp.redirect('login')
        }

    }catch(error){
        console.log("fallo la funcion traer_login en controllers/login.js por el error:\n", error)
        resp.status(500).json({data_error: error})
    }
}

export const log_out = async (req, resp)=>{
    req.session.destroy(error=>{
        if(error){
            return resp.send({status:false, body: error})
        }
        else{
            return resp.redirect('login')
        }
    })
}