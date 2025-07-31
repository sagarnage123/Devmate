const express=require("express");
const router=express.Router();
const {getUserTags}=require("../controllers/getUserTags");
const {protect}=require("../middleware/authMiddleware");

router.get("/",protect,getUserTags);

module.exports=router;
