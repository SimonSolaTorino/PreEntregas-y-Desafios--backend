import passport from "passport";
import local from "passport-local";
import GithubStrategy from "passport-github2";
import usersModel from "../models/users.model.js"
import { contraseña_valida, crear_hash } from "../utils/bcrypt.js";

const LocalStrategy = local.Strategy

export const iniciar_passport = ()=>{
    passport.use('register', new LocalStrategy(
        {passReqToCallback: true, usernameField: 'email'}, 
        async (req, username, password, done)=>{
            try{
                const {confirmPassword, email, name, lastname} = req.body

                if(password !== confirmPassword){
                    console.log("las contras no coinciden")
                    return done(null, false)
                }
                else{
                    let usuario = await  usersModel.findOne({email: username})
                    if(usuario){
                        console.log("el usuario ya existe.")
                        return done(null, false)
                    }
                    else{
                        const password_hasheada = crear_hash(confirmPassword)
                        const usuario_nuevo = await usersModel.create({
                            name: name,
                            lastname: lastname,
                            email: email,
                            password: password_hasheada
                        })
                        if(!usuario_nuevo){
                            return done(null, false)
                        }else{
                            usuario = usuario_nuevo
                            console.log("registro correcto")
                            return done(null, usuario)
                        }
                    }
                }
            }
            catch(error){
                done(error)
            }

        }))
    passport.use('login', new LocalStrategy(
        {usernameField: 'email'}, 
        async (username, password, done)=>{
            try{
                const usuario = await usersModel.findOne({email: username})

                if(!usuario){
                    console.log("no existe el usuario")
                    return done(null, false)
                }else{
                    if(contraseña_valida(password, usuario.password)){
                        console.log("login correcto")
                        console.log("usuario en config", usuario)
                        return done(null, usuario)

                    }else{
                        console.log("contraseña incorrecta")
                        return done(null, false)
                    }

                }

            }catch(error){
                done(error)
            }
        }))

    passport.serializeUser((user, done)=>{
        done(null, user._id)
    })
    passport.deserializeUser(async (id, done)=>{
        const usuario = await usersModel.findById(id)
        if(!usuario){
            return done(null, false)
        }
        else{
            return done(null, usuario)
        }
    })

    passport.use('github', new GithubStrategy(
        {
            clientID:'Iv1.f46406374adc4c76',
            clientSecret: 'b76bfb48997e7d28491d7f0944efc9c606d8052a',
            callbackURL:'http://192.168.0.6:8080/now/githubcallback'
        },
        async (accessToken, refreshToken, profile, done)=>{
            try{
                const email = profile._json.email
                let user = await  usersModel.findOne(email)

                if(user){
                    return done(null, user)
                }else{
                    const newUser = {
                        name: profile._json.name,
                        email: email,
                        password:  '.$',
                        social: true
                    }
                    user = await usersModel.create(newUser)

                    return done(null, user)
                }

            }catch(error){
                done(error)
            }

        })
        )

}

