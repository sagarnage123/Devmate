const express=require("express");
const router=express.Router();
const {registerUser,loginUser}=require("../controllers/userController.js");
const {protect}=require("../middleware/authMiddleware.js");
const User = require("../models/User.js");
const {updateUser}=require("../controllers/userController.js");
const {getUserProfile,getCurrentUser}=require("../controllers/userController.js");


router.post("/register",registerUser);
router.post("/login",loginUser);
router.put("/update",protect,updateUser);
router.get("/profile",protect,getUserProfile);
router.get("/me",protect,getCurrentUser);

module.exports=router;