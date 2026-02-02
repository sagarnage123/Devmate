"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClients = exports.createClient = void 0;
const Client_1 = __importDefault(require("../models/Client"));
const validator_1 = __importDefault(require("validator"));
const createError_1 = require("../utils/createError");
const asyncHandler_1 = require("../utils/asyncHandler");
exports.createClient = (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
    const { name, email, phone, address } = req.body;
    if (email && !validator_1.default.isEmail(email)) {
        return next((0, createError_1.createError)("Please enter the valid email", 400));
    }
    if (!req.user) {
        return next((0, createError_1.createError)("Unauthorized", 401));
    }
    if (email) {
        const doesEmailExists = await Client_1.default.findOne({
            email,
            userId: req.user._id,
        });
        if (doesEmailExists) {
            return next((0, createError_1.createError)("This email is already registered", 409));
        }
    }
    const newClient = await Client_1.default.create({
        userId: req.user._id,
        name,
        email,
        phone,
        address,
    });
    res.status(201).json({
        success: true,
        data: {
            id: newClient._id.toString(),
            name: newClient.name,
            email: newClient.email,
            phone: newClient.phone,
            address: newClient.address,
        },
    });
});
exports.getClients = (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
    if (!req.user) {
        return next((0, createError_1.createError)("Unauthorized", 401));
    }
    const clients = await Client_1.default.find({
        userId: req.user._id,
    });
    res.status(200).json({
        clients: clients.map((client) => ({
            id: client._id.toString(),
            name: client.name,
            email: client.email,
            phone: client.phone,
            address: client.address,
        })),
    });
});
