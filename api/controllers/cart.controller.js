import express from "express";
import Menu from "../models/menu.model.js";
import asyncHandler from "../helper/asyncHandler.js";
import apiResponse from "../helper/apiResponse.js";
import ApiError from "../helper/ApiError.js";

import Cart from "../models/cart.model.js";

export const addToCart = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.userId;
    const menuId = req.params.menuId;
    const quantity = req.body.quantity || 1;

    if (!userId) {
      throw new ApiError(400, "Please login to add menu to cart");
    }
    if (!menuId) {
      throw new ApiError(400, "Menu id is required");
    }

    const menuData = await Menu.findById(menuId);

    if (!menuData) {
      throw new ApiError(404, "Menu not found");
    }


    //to check if the menu is already in the cart
    const userData = await Cart.findOne({ user: userId });

    if (userData) {
    //to check if the menu is already in the cart
      const isMenuInCart = await Cart.find({
        user: userId,
        "menus.menu": menuId,
      });

  
      //if menu is already in the cart
      if (isMenuInCart.length > 0) {
        const cart = isMenuInCart[0];
    
        const menu = cart.menus.find((m) => m.menu.equals(menuId));
        throw new ApiError(400, "menu already in cart");
        
      }
      else{
        userData.menus.push({ menu: menuId, quantity });
        userData.totalQuantity += quantity;
        await userData.save(); 
        const cartData = await Cart.findOne({user
          :userId});

        return res
          .status(200)
          .json(new apiResponse(200, "Menu added to cart successfully",{cartData}));
      }
    } else {
      const newCart = await Cart.create({
        user: userId,
        menus: [{ menu: menuId, quantity }],
      });

      const cartData = await Cart.findOne({user
        :userId});

        if (!cartData) {
          throw new ApiError(404, "Cart not found");
        }

      return res
      .status(201)
      .json(new apiResponse(201, "Menu added to cart successfully",{cartData}));
     
    }
   
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Error adding menu to cart  as : "+ error.message);
  }
});


export const increaseQuantity = asyncHandler(async (req, res) => {
   try {
     const userId = req.params.userId;
     const menuId = req.params.menuId;
 
     if (!userId) {
       throw new ApiError(400, "Please login to add menu to cart");
     }
     if (!menuId) {
       throw new ApiError(400, "Menu id is required");
     }
 
     const menuData = await Menu.findById(menuId);
     if (!menuData) {
       throw new ApiError(404, "Menu not found");
     }
 
     const userCart = await Cart.findOne({ user: userId });
     if (!userCart) {
       throw new ApiError(404, "Please add menu to cart first");
     }
 
     const isMenuInCart = await Cart.find({
       user: userId,
       "menus.menu": menuId,
     });
 
 
     if (isMenuInCart.length > 0) {
     const cart = isMenuInCart[0];
     const menu  = cart.menus.find((m)=>m.menu.equals(menuId));
     menu.quantity += 1;
     cart.totalQuantity += 1;
     await cart.save();
     const cartData = await Cart.findOne({user:userId});
     return res.status(200).json(new apiResponse(200, "Menu quantity increased successfully",{cartData}));
     }
     
   } catch (error) {
    console.log(error)
     throw new ApiError(500, "Error increasing menu quantity");
   }
})

export const decreaseQuantity = asyncHandler(async (req, res) => {
    try {
        const userId = req.params.userId;
        const menuId = req.params.menuId;
    
        if (!userId) {
        throw new ApiError(400, "Please login to add menu to cart");
        }
        if (!menuId) {
        throw new ApiError(400, "Menu id is required");
        }
    
        const menuData = await Menu.findById(menuId);
        if (!menuData) {
        throw new ApiError(404, "Menu not found");
        }
    
        const userCart = await Cart.findOne({ user: userId });
        if (!userCart) {
        throw new ApiError(404, "Please add menu to cart first");
        }
    
        const isMenuInCart = await Cart.find({
        user: userId,
        "menus.menu": menuId,
        });
    
      
    
        if (isMenuInCart.length > 0) {
        const cart = isMenuInCart[0];
        const menu  = cart.menus.find((m)=>m.menu.equals(menuId));
        if(menu.quantity === 1){
            throw new ApiError(400, "Minimum quantity is 1");

        }
        else{
        menu.quantity -= 1;
        cart.totalQuantity -= 1;
           await cart.save();
        const cartData = await Cart.findOne({user:userId});
        return res.status(200).json(new apiResponse(200, "Menu quantity decreased successfully", {cartData}));
        }
        }
        
    } catch (error) {
    console.log(error)
        throw new ApiError(500, "Error decreasing menu quantity");
    }
    })

    export const removeFromCart = asyncHandler(async(req,res)=>{
        try {
            const userId = req.params.userId;
            const menuId = req.params.menuId;

            if (!userId) {
                throw new ApiError(400, "Please login to add menu to cart");
            }
            if (!menuId) {
                throw new ApiError(400, "Menu id is required");
            }

            const menuData = await Menu.findById(menuId);
            if (!menuData) {
                throw new ApiError(404, "Menu not found");
            }

            const userCart = await Cart.findOne({ user: userId });
            if (!userCart) {
                throw new ApiError(404, "Please add menu to cart first");
            }

            const isMenuInCart = await Cart.find({
                user: userId,
                "menus.menu": menuId,
            });

            if (isMenuInCart.length >0){
                const cart = isMenuInCart[0];
                const menu = cart.menus.find((m)=>m.menu.equals(menuId));
                cart.menus.pull(menu);
                cart.totalQuantity -= menu.quantity;
                await cart.save();

                const cartData = await Cart.findOne({user:userId});
                return res.status(200).json(new apiResponse(200, "Menu removed from cart successfully", {cartData}));
            }


        } catch (error) {
            throw new ApiError(500, "Error removing menu from cart");
        }
    })


export const  getCart = asyncHandler(async(req,res)=>{
    try {
        const userId = req.params.userId
        if (!userId) {
            throw new ApiError(400, "Please login to add menu to cart");
        }

        const userCart = await Cart.find(
            { 
                user: userId
            }
            
        )
        if(!userCart){
            throw new ApiError(404, "Cart is empty")
        }

        const cartData = userCart[0];
        return res.status(200).json(new apiResponse(200, "Cart data fetched successfully", {cartData}))
        
        
    } catch (error) {
       console.log(error)
        throw new ApiError(500, "Error fetching cart data")
    }
})