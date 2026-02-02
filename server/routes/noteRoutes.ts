import express from "express";
import { protect } from "../middleware/authMiddleware";
import { createNote, getNotesByProject, deleteNote } from "../controllers/noteController";

const router = express.Router();


router.post("/", protect, createNote);


router.get("/:projectId", protect, getNotesByProject);


router.delete("/:id", protect, deleteNote);

export default router;
