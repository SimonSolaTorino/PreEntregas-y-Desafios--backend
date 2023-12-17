import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const cartCollection = 'cart'

const cartSchema = new mongoose.Schema({
    products: {
        type:[{
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref:'products'
            },
            quantity: Number
        }],
        default:[]
    }
})

cartSchema.plugin(mongoosePaginate)
cartSchema.pre('findOne', function (next) {
    this.populate('products.product')
    next()
})

const cartModel = mongoose.model(cartCollection, cartSchema)
export default cartModel