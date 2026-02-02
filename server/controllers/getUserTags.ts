
import Note from "../models/Note";
import { asyncHandler } from "../utils/asyncHandler";
import { createError } from "../utils/createError";
import { Request, Response, NextFunction } from "express";

const getUserTags = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    if(!req.user || !req.user._id){
        return next(createError("User not authenticated", 401));
    }

    const tags = await Note.distinct("tags", { user: req.user._id });

    res.status(200).json({
        success: true,
        count: tags.length,
        tags: tags

    });

});

export {
    getUserTags
};
