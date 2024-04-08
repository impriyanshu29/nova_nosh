import User from "../models/user.model.js";
import ApiError from "../helper/apiError.js";
import {sendEmail} from "../helper/sendMail.js";
import asyncHandler from "../helper/asyncHandler.js";
import apiResponse from "../helper/apiResponse.js";
import schedule from "node-schedule";


//functions to be used later---------------------------------------------------------------------------------------------
  function isValidEmail(email) {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(email);
    }
    
  function isStrongPassword(password) {
      const lowercase = /[a-z]/.test(password);
      const uppercase = /[A-Z]/.test(password);
      const number = /[0-9]/.test(password);
      const special = /[@,#,$,%,&,*]/.test(password);
      const length = password.length >= 8;
      return lowercase && uppercase && number && special && length;
    }
    
  function generateRandomPassword(length) {
      const charset =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
      let password = "";
    
      for (let i = 0; i < length; i++) {
        const index = Math.floor(Math.random() * charset.length);
        password = password + charset.charAt(index);
      }
    
      return password;
    }

//----------------------------------------------------------------------------------------------------------------------------

//signUp function----------------------------------------------------------------------------------------------------------------
  export const signUp = asyncHandler(async (req,res) => {
    
    const {lastName,firstName,email,password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      throw new ApiError(400, "All fields are required");
    }

    if (!isValidEmail(email)) {
      throw new ApiError(400, "Invalid email");
    }

    if (!isStrongPassword(password)) {
      throw new ApiError(
        400,
        "Password must be 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character"
      );
    }

    const existedUser = await User.findOne({ email });
    if (existedUser) {
      throw new ApiError(400, "Email already exists");
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
    });

    const createdUser = await User.findById(user._id);
    if (!createdUser) {
      throw new ApiError(500, "User not found");
    }

    

    await sendEmail({
      email,
      emailType: "verifyEmail",
      userId: createdUser._id,
    });


  await user.save();
    
  return res
  .status(201)
  .json(new apiResponse(201, "User created successfully Please verify your email address"));
  });

//----------------------------------------------------------------------------------------------------------------------------

//verifyEmail function---------------------------------------------------------------------------------------------------------

export const verifyEmail = asyncHandler(async(req,
res)=>{

  const token = req.params.token;
  console.log(token);

  try {
    const token = req.query.token;
    
  if(!token){
    throw new ApiError(400, "Invalid token");
  }

  const user = await User.findOne({
    verifyToken:token,
    verifyTokenExpire:{$gt: Date.now() },
  });

  if (!user) {
    throw new ApiError(400, "Invalid or expired token");
  }

  user.verifyToken = undefined;
  user.verifyTokenExpire = undefined;
  user.isVerified = true;
  await user.save();

  return res
  .status(200)
  .json(new apiResponse(200, "Email verified successfully"));

    
  } catch (error) {
    throw new ApiError(500, "Internal server error");
  }

})

//----------------------------------------------------------------------------------------------------------------------------

//clearing unverified users---------------------------------------------------------------------------------------------------

const clearExpiredTokens = async () => {
  try {
    
    const expiredUsers = await User.find({
      verifyTokenExpire: { $lt: new Date() }
    });


    await Promise.all(expiredUsers.map(async user => {
      user.verifyToken = undefined;
      user.verifyTokenExpire = undefined;
      await user.save();
    }));

    console.log('Expired verification tokens cleared.');
  } catch (error) {
    console.error('Error clearing expired verification tokens:', error);
  }
};

//at 00:00 everyday
schedule.scheduleJob('0 0 * * *', clearExpiredTokens);

//----------------------------------------------------------------------------------------------------------------------------