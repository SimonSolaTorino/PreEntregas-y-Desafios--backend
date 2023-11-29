//lLIBRERIAS
import express from "express";
import handlebars from "express-handlebars";
import __direname from "./utils.js";
import mongoose from "mongoose";
import routerProducts from "./routes/products.router.js"


//INSTANCIAMOS APP
const app = express()
//HANDLEBARS
app.engine('handlebars', handlebars.engine())
app.set('views', __direname + '/views')
app.set('view engine', 'handlebars')

//RUTAS:
app.get('/products', routerProducts)

//CONEXION CON LA DB
const mongoURL = 'mongodb+srv://simonsolat:lDTOOk46b0F6VymI@cluster0.cjjajx4.mongodb.net/'
mongoose.connect(mongoURL, {dbName: "pre-entrega2"})
    .then(()=>app.listen(8080))
    .catch(e=> console.error(e))