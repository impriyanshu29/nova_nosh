import ApiError from "../helper/apiError.js";
import asyncHandler from "../helper/asyncHandler.js";
import apiResponse from "../helper/apiResponse.js";
import Table from "../models/table.model.js";
import User from "../models/user.model.js";

//Creating a new table
export const createTable = asyncHandler(async (req, res) => {
  try {
    const { name, capacity, reservedAt, reservedTime, reservedBy, event } =
      req.body;

    if (
      !name ||
      !capacity ||
      !reservedAt ||
      !reservedTime ||
      !reservedBy ||
      !event
    ) {
      return res
        .status(400)
        .json(new apiResponse({}, "Please fill all the fields", 400));
    }

    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json(new apiResponse({}, "User not found", 400));
    }

    const table = await Table.create({
      name,
      capacity,
      reservedAt,
      reservedTime,
      reservedBy,
      event,
      userId,
     
    });

    if (!table) {
      return res
        .status(400)
        .json(new apiResponse({}, "Error creating table", 400));
    }

    return res
      .status(200)
      .json(new apiResponse(table, "Table created successfully", 200));
  } catch (error) {
    throw new ApiError(500, "Error Creating table info");
  }
});

//Getting all tables
export const allTables = asyncHandler(async (req, res) => {
  try {
    const userID = req.params.userId;
  
    const user = await User.findById(userID);

  
    if (!user) {
      return res.status(400).json(new apiResponse({}, "User not found", 400));
    }
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    let startIndex = (page - 1) * limit;
    if (req.query.startIndex) {
      startIndex = parseInt(req.query.startIndex);
    }
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    //Checking if the user is admin and return all tables if true
    console.log(user.isAdmin);
    if (user.isAdmin) {
      const tables = await Table.find()
        .sort({ createdAt: sortDirection })
        .limit(limit)
        .skip(startIndex);
      const totalTables = await Table.countDocuments();
      return res
        .status(200)
        .json(new apiResponse({tables,totalTables}, "Table fetched successfully", 200));
    }

    // Checking if the user is not admin and return only the tables created by the user
    else {
      const tables = await Table.find({
        user: userID,
        ...(req.query.tableId && { _id: req.query.tableId }),
      })
        .sort({ createdAt: sortDirection })
        .limit(limit)
        .skip(startIndex);

      return res
        .status(200)
        .json(new apiResponse(tables, "Table fetched successfully", 200));
    }
  } catch (error) {
    throw new ApiError(500, "Error fetching table details ", error);
  }
});

//Getting a single table
export const getTable = asyncHandler(async (req, res) => {
    try {
        const userId = req.user.isAdmin;
        if (!userId) {
        return res.status(400).json(new apiResponse({}, "User is not allowed", 400));
        }

        const tableId = req.params.tableId;
        const table = await Table.findById(tableId);
        if (!table) {
        return res.status(400).json(new apiResponse({}, "Table not found", 400));
        }
    
        return res
        .status(200)
        .json(new apiResponse(table, "Table fetched successfully", 200));
    } catch (error) {
        throw new ApiError(500, "Error fetching table details");
    }
    });
// Updating table details
export const updateTable = asyncHandler(async (req, res) => {
  try {
    const { name, capacity, reservedAt, reservedTime, reservedBy, event } =
      req.body;

    const tableId = req.params.tableId;
    const table = await Table.findById(tableId);
    if (!table) {
      return res.status(400).json(new apiResponse({}, "Table not found", 400));
    }

    // if (table.reservedAt < new Date()) {
    //     return res
    //         .status(400)
    //         .json(new apiResponse({}, "Reservation time is past", 400));
    //     }

    //if no field is updated
    if (!name && !capacity && !reservedAt && !reservedTime && !reservedBy && !event) {
        return res
        .status(400)
        .json(new apiResponse({}, "Please fill all the fields", 400));
    }
    const updatedTable = await Table.findByIdAndUpdate(
      tableId,
      {
        name,
        capacity,
        reservedAt,
        reservedTime,
        reservedBy,
        event,
      },
      { new: true }
    );

    if (!updatedTable) {
      return res
        .status(400)
        .json(new apiResponse({}, "Error updating table", 400));
    }

    return res
      .status(200)
      .json(new apiResponse(updatedTable, "Table updated successfully", 200));
  } catch (error) {
    throw new ApiError(500, "Error updating table");
  }
});

//Cancelling a table
export const cancelTable = asyncHandler(async (req, res) => {
    try {
        const tableId = req.params.tableId;
        const table = await Table.findById(tableId);
        if (!table) {
        return res.status(400).json(new apiResponse({}, "Table not found", 400));
        }
    
        // if (table.reservedAt < new Date()) {
        // return res
        //     .status(400)
        //     .json(new apiResponse({}, "Reservation time is past", 400));
        // }
    
        const updatedTable = await Table.findByIdAndUpdate(
        tableId,
        {
            isReserved: false,
        },
        { new: true }
        );
    
        if (!updatedTable) {
        return res
            .status(400)
            .json(new apiResponse({updateTable}, "Error cancelling table", 400));
        }
    
        return res
        .status(200)
        .json(new apiResponse(updatedTable, "Table cancelled successfully", 200));
    } catch (error) {
        throw new ApiError(500, "Error cancelling table");
    }
    });

//Deleting a table
export const deleteTable = asyncHandler(async (req, res) => {
    try {
        const isAdmin = req.user.isAdmin;
        if (!isAdmin) {
        return res.status(400).json(new apiResponse({}, "User is not allowed", 400));
        }
        const tableId = req.params.tableId;
        const table = await Table.findByIdAndDelete(tableId);
        if (!table) {
        return res.status(400).json(new apiResponse({}, "Table not found", 400));
        }
    
        return res
        .status(200)
        .json(new apiResponse({}, "Table deleted successfully", 200));
    } catch (error) {
        throw new ApiError(500, "Error deleting table");
    }
    }
);

//confirm table reservation
export const confirmTable = asyncHandler(async (req, res) => {
    try {
        const isAdmin = req.user.isAdmin;
        if(!isAdmin){
            return res.status(400).json(new apiResponse({}, "User is not allowed", 400));
        }

        const tableId = req.params.tableId;
        const table = await Table.findById(tableId);
        if (!table) {
        return res.status(400).json(new apiResponse({}, "Table not found", 400));
        }
    
        // if (table.reservedAt < new Date()) {
        // return res
        //     .status(400)
        //     .json(new apiResponse({}, "Reservation time is past", 400));
        // }
    
        const updatedTable = await Table.findByIdAndUpdate(
        tableId,
        {
            isReserved: true,
            isOccupied: true,
        },
        { new: true }
        );
    
        if (!updatedTable) {
        return res
            .status(400)
            .json(new apiResponse({}, "Error confirming table", 400));
        }
    
        return res
        .status(200)
        .json(new apiResponse(updatedTable, "Table confirmed successfully", 200));
    } catch (error) {
        throw new ApiError(500, "Error confirming table");
    }
    }
)
