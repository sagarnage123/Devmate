
const Note=require("../models/Note");
const {asyncHandler}=require("../utils/asyncHandler");

const getUserTags = asyncHandler(async (req, res, next) => {

    const tags = await Note.distinct("tags", { user: req.user._id });

    res.status(200).json({
        success: true,
        count: tags.length,
        tags: tags

    });

});

module.exports={getUserTags};
