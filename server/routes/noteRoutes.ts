import express from "express";
import { protect } from "../middleware/authMiddleware";
import { createNote, getNotesByProject, deleteNote, updateNote } from "../controllers/noteController";

const router = express.Router();


router.post("/", protect, createNote);

router.put("/:id", protect, updateNote);
router.get("/:projectId", protect, getNotesByProject);


router.delete("/:id", protect, deleteNote);

export default router;
