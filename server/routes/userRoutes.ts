import express from "express";
import {registerUser,loginUser,updateUser,getCurrentUser,getUserProfile} from "../controllers/userController";
import {protect} from "../middleware/authMiddleware";

const router=express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.put("/update",protect,updateUser);
router.get("/profile",protect,getUserProfile);
router.get("/me",protect,getCurrentUser);

export default router;