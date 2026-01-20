"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.getNotesByProject = exports.createNote = void 0;
const Note_js_1 = __importDefault(require("../models/Note.js"));
const createError_js_1 = require("../utils/createError.js");
const asyncHandler_js_1 = require("../utils/asyncHandler.js");
const createNote = (0, asyncHandler_js_1.asyncHandler)(async (req, res, next) => {
    const { projectId, content } = req.body;
    if (!projectId || !content) {
        return next((0, createError_js_1.createError)("ProjectId and content are required", 400));
    }
    const note = await Note_js_1.default.create({ projectId, content });
    res.status(201).json(note);
});
exports.createNote = createNote;
const getNotesByProject = (0, asyncHandler_js_1.asyncHandler)(async (req, res, next) => {
    const { projectId } = req.params;
    const notes = await Note_js_1.default.find({ projectId }).sort({ createdAt: -1 });
    res.json(notes);
});
exports.getNotesByProject = getNotesByProject;
const deleteNote = (0, asyncHandler_js_1.asyncHandler)(async (req, res, next) => {
    const { id } = req.params;
    const note = await Note_js_1.default.findByIdAndDelete(id);
    if (!note) {
        return next((0, createError_js_1.createError)("Note not found", 404));
    }
    res.json({ message: "Note deleted successfully" });
});
exports.deleteNote = deleteNote;
