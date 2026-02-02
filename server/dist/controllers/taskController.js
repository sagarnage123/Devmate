"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.getTask = exports.updateTask = exports.createTask = void 0;
const Task_1 = __importDefault(require("../models/Task"));
const Project_1 = __importDefault(require("../models/Project"));
const asyncHandler_1 = require("../utils/asyncHandler");
const createError_1 = require("../utils/createError");
const createTask = (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
    if (!req.user)
        return next((0, createError_1.createError)("Unauthorized", 401));
    const { projectId, title, description, status, priority, dueDate } = req.body;
    if (!projectId)
        return next((0, createError_1.createError)("Project required for creating task", 400));
    if (!title)
        return next((0, createError_1.createError)("Title is required for the task", 400));
    const project = await Project_1.default.findOne({ _id: projectId, userId: req.user._id });
    if (!project)
        return next((0, createError_1.createError)("Project not found", 404));
    const newTask = await Task_1.default.create({
        userId: req.user._id,
        projectId,
        title,
        priority,
        status,
        dueDate,
        description
    });
    res.status(201).json({ succes: true, data: newTask });
});
exports.createTask = createTask;
const updateTask = (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
    if (!req.user)
        return next((0, createError_1.createError)("Unautorized", 401));
    const { id } = req.params;
    if (!id)
        return next((0, createError_1.createError)("Not found", 404));
    const allowedUpdates = ["title", "description", "status", "priority", "dueDate", "completedAt"];
    const updates = {};
    for (const key of allowedUpdates) {
        if (req.body[key] !== undefined)
            updates[key] = req.body[key];
    }
    const task = await Task_1.default.findOneAndUpdate({ _id: id, userId: req.user._id }, updates, { new: true, runValidators: true });
    if (!task)
        return next((0, createError_1.createError)("Task not found", 404));
    res.status(200).json({ succes: true, data: task });
});
exports.updateTask = updateTask;
const getTask = (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
    if (!req.user)
        return next((0, createError_1.createError)("Unathorized", 401));
    const { projectId, status, priority } = req.query;
    const filter = { userId: req.user._id };
    if (projectId)
        filter.projectId = projectId;
    if (priority)
        filter.priority = priority;
    if (status)
        filter.status = status;
    const tasks = await Task_1.default.find(filter).sort({ dueDate: 1 });
    res.status(200).json({ succes: true, data: tasks });
});
exports.getTask = getTask;
const deleteTask = (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
    if (!req.user)
        return next((0, createError_1.createError)("Unauthorized", 401));
    const { id } = req.params;
    if (!id)
        return next((0, createError_1.createError)("No task found", 404));
    const task = await Task_1.default.findOneAndDelete({ _id: id, userId: req.user._id });
    if (!task)
        return next((0, createError_1.createError)("Task not found", 404));
    res.status(200).json({ succes: true, message: "Task deleted succesfuly" });
});
exports.deleteTask = deleteTask;
