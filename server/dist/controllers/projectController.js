"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.updateProject = exports.getProject = exports.createProject = void 0;
const Client_1 = __importDefault(require("../models/Client"));
const Project_1 = __importDefault(require("../models/Project"));
const asyncHandler_1 = require("../utils/asyncHandler");
const createError_1 = require("../utils/createError");
const createProject = (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
    const { clientId, budget, dueDate, startDate, description, status, title } = req.body;
    if (!req.user)
        return next((0, createError_1.createError)("Unauthorized", 401));
    if (!clientId)
        return next((0, createError_1.createError)("Client Id is required", 400));
    const client = await Client_1.default.findOne({ _id: clientId, userId: req.user._id });
    if (!client)
        return next((0, createError_1.createError)("Client not found", 404));
    const newProject = await Project_1.default.create({
        userId: req.user._id,
        clientId,
        status,
        startDate,
        dueDate,
        budget,
        description,
        title
    });
    res.status(201).json({
        success: true,
        data: newProject
    });
});
exports.createProject = createProject;
const getProject = (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
    const { clientId, status } = req.query;
    if (!req.user)
        return next((0, createError_1.createError)("Unauthorized", 401));
    const filter = { userId: req.user._id };
    if (clientId)
        filter.clientId = clientId;
    if (status)
        filter.status = status;
    const projects = await Project_1.default.find(filter);
    res.status(200).json({ projects });
});
exports.getProject = getProject;
const updateProject = (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
    const { id } = req.params;
    if (!req.user) {
        next((0, createError_1.createError)("Unauthorized", 401));
        return;
    }
    const allowedUpdates = [
        "title",
        "description",
        "status",
        "startDate",
        "dueDate",
        "budget",
    ];
    const updates = {};
    for (const key of allowedUpdates) {
        if (req.body[key] !== undefined) {
            updates[key] = req.body[key];
        }
    }
    const updatedProject = await Project_1.default.findOneAndUpdate({ _id: id, userId: req.user._id }, updates, { new: true, runValidators: true });
    if (!updatedProject) {
        next((0, createError_1.createError)("No Project found", 404));
        return;
    }
    res.status(200).json({
        success: true,
        data: updatedProject,
    });
});
exports.updateProject = updateProject;
const deleteProject = (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
    const { id } = req.params;
    if (!req.user)
        return next((0, createError_1.createError)("Unauthorized", 401));
    const deletedProject = await Project_1.default.findOneAndDelete({ _id: id, userId: req.user._id });
    if (!deletedProject) {
        return next((0, createError_1.createError)("Project not found", 404));
    }
    res.status(200).json({
        message: "Project deleted succesfully",
        success: true
    });
});
exports.deleteProject = deleteProject;
