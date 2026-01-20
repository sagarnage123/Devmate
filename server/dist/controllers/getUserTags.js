"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserTags = void 0;
const Note_1 = __importDefault(require("../models/Note"));
const asyncHandler_js_1 = require("../utils/asyncHandler.js");
const createError_js_1 = require("../utils/createError.js");
const getUserTags = (0, asyncHandler_js_1.asyncHandler)(async (req, res, next) => {
    if (!req.user || !req.user._id) {
        return next((0, createError_js_1.createError)("User not authenticated", 401));
    }
    const tags = await Note_1.default.distinct("tags", { user: req.user._id });
    res.status(200).json({
        success: true,
        count: tags.length,
        tags: tags
    });
});
exports.getUserTags = getUserTags;
