import express from "express";
import { protect } from "../middleware/authMiddleware";
import {createProject,getProject, updateProject,deleteProject}from"../controllers/projectController";

const router=express.Router();

router.post("/",protect,createProject);
router.get("/",protect,getProject);
router.put("/:id",protect,updateProject);
router.delete("/:id",protect,deleteProject);

export default router;