const express = require( "express");
const { createNote, getNotesByProject, deleteNote } =require( "../controllers/noteController.js");
const { protect } =require( "../middleware/authMiddleware.js");

const router = express.Router();


router.post("/", protect, createNote);


router.get("/:projectId", protect, getNotesByProject);


router.delete("/:id", protect, deleteNote);

module.exports= router;
