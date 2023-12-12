import mongoose from "mongoose";

export const db_conection = async ()=>{
    try{
        const mongoURL = 'mongodb+srv://simonsolat:lDTOOk46b0F6VymI@cluster0.cjjajx4.mongodb.net/'
        await  mongoose.connect(mongoURL, {dbName: "pre-entrega2"})
        console.log("DB conectada")
    }catch(error){
        console.log("error al levantar la DB")
        console.log(error)
        process.exit(1)
    }
}