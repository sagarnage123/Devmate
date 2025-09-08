const jwt = require("jsonwebtoken");
const {asyncHandler} = require("../utils/asyncHandler");
const {createError} = require("../utils/createError");
const User = require("../models/User");

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];

        try {
            
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const user = await User.findById(decoded.id).select("-password");

            
            if (!user) {
                return next(createError("User not found", 404));
            }
        
            req.user = user;

            
            next();
        } catch (error) {
            console.error("❌ JWT error:", error.message);
            return next(createError("Not authorized, token failed", 401));
        }
    } else {
      
        return next(createError("Not authorized, no token", 401));
    }
});

module.exports = { protect };
