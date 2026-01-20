"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const asyncHandler_1 = require("../utils/asyncHandler");
const createError_1 = require("../utils/createError");
const User_1 = __importDefault(require("../models/User"));
const protect = (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            const user = await User_1.default.findById(decoded.id).select("-password");
            if (!user) {
                return next((0, createError_1.createError)("User not found", 404));
            }
            req.user = user;
            next();
        }
        catch (error) {
            console.error("❌ JWT error:", error.message);
            return next((0, createError_1.createError)("Not authorized, token failed", 401));
        }
    }
    else {
        return next((0, createError_1.createError)("Not authorized, no token", 401));
    }
});
exports.protect = protect;
