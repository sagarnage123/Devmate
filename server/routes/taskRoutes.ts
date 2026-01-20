import express from "express";
import {protect}from "../middleware/authMiddleware";
import {createTask,updateTask,getTask,deleteTask}from "../controllers/taskController";

const router=express.Router();
router.post("/",protect,createTask);
router.get("/",protect,getTask);
router.put("/:id",protect,updateTask);
router.delete("/:id",protect,deleteTask);

export default router;