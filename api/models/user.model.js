import e from 'express';
import mongoose from 'mongoose';
import {Schema} from 'mongoose';

const userSchema = new Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    address:{
        type: String,
       
    },
    phone:{
        type: Number,
       
    },
    image:{
        type: String,
       
    },
    refreshToken:{
        type: String,
       
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    forgotPasswordToken:String,
        forgotPasswordExpire:Date,
        verifyToken:String,
        verifyTokenExpire:Date,
},{timestamps:true});

const User = mongoose.model('User', userSchema);
export default User;