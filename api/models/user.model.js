import express from 'express';
import mongoose from 'mongoose';
import {Schema} from 'mongoose';
import bcryptjs from 'bcryptjs';

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
        // forgot password token and expire
        forgotPasswordToken:String,
        forgotPasswordExpire:Date,

        // verify email token and expire
        verifyToken:String,
        verifyTokenExpire:Date,
},{timestamps:true});


// user creates or changes their password, we want to make sure that it's kept safe and secure
userSchema.pre("save" , async function(next){
    if(this.isModified("password")){
        this.password = await bcryptjs.hash(this.password, 10);
    }
    else{
        next();     
    }
})



const User = mongoose.model('User', userSchema);
export default User;