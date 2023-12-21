//lLIBRERIAS
import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
//UTILIDADES
import __dirname from "./utils.js";
import routerProducts from "./routes/products.router.js";
import routerCart from "./routes/carts.router.js";
import routerViews from "./routes/views.router.js";
import routerLogin from "./routes/login.router.js";
import { db_conection } from "./database/config.js";
import productModel from "./models/product.model.js";
import messageModel from "./models/message.model.js";
import { iniciar_passport } from "./config/passport.js";

//INSTANCIAMOS APP
const app = express()
const PORT = 8080
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

//SESSION:
app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://simonsolat:lDTOOk46b0F6VymI@cluster0.cjjajx4.mongodb.net/pre-entrega2',
        ttl:3600
    }),
    secret: 'PREENTRE3SECRET',
    resave: true,
    saveUninitialized: true
}))

//PASSPORT
iniciar_passport()
app.use(passport.initialize())
app.use(passport.session())

//HANDLEBARS
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

//RUTAS:
app.get('/',routerViews)
app.use('/now', routerLogin)
app.use('/api/carts', routerCart)
app.use('/products', routerProducts)

//CONEXION CON LA DB
await db_conection()

//INSTANCIAMOS EL SERVIDOR
const express_server = app.listen(PORT, ()=>{console.log(`Listening to port ${PORT}`)})
const io = new Server(express_server)

io.on('connection', async (socket)=>{

    console.log("cliente conectado desde el front.")

    const productos = await productModel.find()
    socket.emit('productos', productos)

    socket.on('agregar_producto',async (prod)=>{
        try{
            const prod_nuevo = await productModel.create({...prod})
            if(prod_nuevo){
                productos.push(prod_nuevo)
                io.emit('productos', productos)
            }
        }
        catch(error){
            console.error("Error al agregar producto con socket.io", error)
        }
    })

    //chat
    const mensajes = await messageModel.find()
    socket.emit('message', mensajes)

    socket.on('message', async (data)=>{
        const new_mensaje = await messageModel.create({...data})
        if(new_mensaje){
            const messages = await messageModel.find()
            io.emit('messagesLogs', messages)
        } 
    })

    socket.broadcast.emit('nuevo_user')
})