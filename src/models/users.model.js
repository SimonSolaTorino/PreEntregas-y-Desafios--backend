import mongoose, { Schema } from "mongoose";

const usersCollection = 'users'

const usersSchema = new Schema({
    name: {type: String, required:true},
    lastname: {type: String, required:true},
    email: {type: String, required:true, unique:true},
    password: {type: String, required:true},
    rol: {type: String, default:'user', enum:['user', 'admin']},
    status: {type: Boolean, default:true},
    fecha_creacion: {type: Date, default: Date.now}
})

usersSchema.set('toJSON', {
    transform: function (doc, ret){
        delete ret.__v;
        return ret;
    }
})

const usersModel  = mongoose.model(usersCollection, usersSchema)

export default usersModel