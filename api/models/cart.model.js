import mongoose from 'mongoose';
import { Schema } from 'mongoose';


const cartSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
    ,
    menu:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Menu',
        required:true
    },
    quantity:{
        type:Number,
        default:1
    }

})

const Cart = mongoose.model('Cart',cartSchema);

export default Cart;