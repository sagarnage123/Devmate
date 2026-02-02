import express from "express";
import { protect } from "../middleware/authMiddleware";
import {getUserTags}from "../controllers/getUserTags";

const router=express.Router();
router.get("/",protect,getUserTags);

export default router;
