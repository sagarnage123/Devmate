"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUser = exports.getUserProfile = exports.updateUser = exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const validator_1 = __importDefault(require("validator"));
const User_1 = __importDefault(require("../models/User"));
const generateToken_1 = require("../utils/generateToken");
const createError_1 = require("../utils/createError");
const asyncHandler_1 = require("../utils/asyncHandler");
exports.registerUser = (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!validator_1.default.isEmail(email)) {
        return next((0, createError_1.createError)("Please enter the valid email", 400));
    }
    const userExists = await User_1.default.findOne({ email });
    if (userExists) {
        return next((0, createError_1.createError)("Email already exists", 400));
    }
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    const newUser = await User_1.default.create({
        name,
        email,
        password: hashedPassword,
    });
    res.status(201).json({
        _id: newUser._id.toString(),
        name: newUser.name,
        email: newUser.email,
        token: (0, generateToken_1.generateToken)(newUser._id.toString()),
    });
});
exports.loginUser = (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User_1.default.findOne({ email });
    if (!user) {
        return next((0, createError_1.createError)("This email is not register", 400));
    }
    const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        return next((0, createError_1.createError)("Invalid Password", 400));
    }
    res.status(200).json({
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        token: (0, generateToken_1.generateToken)(user._id.toString()),
    });
});
exports.updateUser = (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
    const { email, name, password } = req.body;
    if (email && !validator_1.default.isEmail(email)) {
        return next((0, createError_1.createError)("Please enter the valid email", 400));
    }
    if (!req.user) {
        return next((0, createError_1.createError)("User is Not found", 401));
    }
    const user = await User_1.default.findById(req.user._id);
    if (!user) {
        return next((0, createError_1.createError)("User Not found", 404));
    }
    if (email && email !== user.email) {
        const curUser = await User_1.default.findOne({ email });
        if (curUser && !curUser._id.equals(user._id)) {
            return next((0, createError_1.createError)("This email is laready registered", 409));
        }
        user.email = email;
    }
    if (name)
        user.name = name;
    if (password)
        user.password = await bcryptjs_1.default.hash(password, 10);
    await user.save();
    res.status(200).json({
        id: user._id.toString(),
        name: user.name,
        email: user.email,
    });
});
exports.getUserProfile = (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
    if (!req.user) {
        return next((0, createError_1.createError)("User not found", 401));
    }
    res.status(200).json({
        id: req.user._id.toString(),
        name: req.user.name,
        email: req.user.email,
    });
});
exports.getCurrentUser = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    res.status(200).json({ user: req.user });
});
