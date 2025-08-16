const express=require("express");
const {createProject}=require("../controllers/projectController");
const {protect}=require("../middleware/authMiddleware.js");

const router=express.Router();

router.post("/",protect,createProject);

module.exports=router;