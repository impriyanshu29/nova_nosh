import Menu from "../models/menu.model.js";
import asyncHandler from "../helper/asyncHandler.js";
import apiResponse from "../helper/apiResponse.js";
import ApiError from "../helper/ApiError.js";
import User from "../models/user.model.js";
import WhistList from "../models/whistlist.model.js";


export const addToWhistList = asyncHandler(async (req, res) => {
    try {
        const menuId = req.params.menuId;
        const userId = req.params.userId;

        if (!userId) {
            throw new ApiError(400, "Please login to add menu to whistlist");
        }
        if (!menuId) {
            throw new ApiError(400, "Menu id is required");
        }
        
        const menu = await Menu.findById(menuId);
        if (!menu) {
            throw new ApiError(404, "Menu not found");
        }

        const menuInWhistList = await WhistList.findOne({ user: userId, menu: menuId });

        console.log(menuInWhistList);
        if(menuInWhistList){
            const result = await WhistList.deleteOne({ user: userId, menu: menuId });
            return res.status(200).json(new apiResponse(200, "Menu removed from whistlist successfully"));
        }

        WhistList.create({
            user: userId,
            menu: menuId
        });

        return res.status(201).json(new apiResponse(201, "Menu added to whistlist successfully"));
    }
    catch (error) {
        throw new ApiError(500, error.message);
    }
});

export const  getWhistList = asyncHandler(async(req,res)=>{
    try {
        
        const userId = req.params.userId;
        const userWishlist = await WhistList.findOne({ user: userId }).select('menus');
        
        console.log("User Wishlist:", userWishlist); 
        
        // Validate that 'menus' is an array
        if (!userWishlist || !Array.isArray(userWishlist.menus)) {
          throw new Error("Wishlist is empty or 'menus' is not an array");
        }
        
        // Now you should have the correct array of menu IDs
        const menuIds = userWishlist.menus; // Should be an array
        
        // Query all menus with the given IDs
        const menus = await Menu.find({ _id: { $in: menuIds } });
        
        console.log("Menus:", menus); // Log the menus to confirm the results
        
        return res.status(200).json({ menus });

        

    } catch (error) {
        throw new ApiError(500, error.message);
    }
})