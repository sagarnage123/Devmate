const express=require("express");
const router=express.Router();
const {registerUser,loginUser}=require("../controllers/userController.js");
const {protect}=require("../middleware/authMiddleware.js");
const User = require("../models/User.js");

router.post("/register",registerUser);
router.post("/login",loginUser);

router.get("/profile",protect,(req,res)=>{
    res.json(req.user);
})

module.exports=router;