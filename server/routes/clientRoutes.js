const express=require("express");
const router=express.Router();
const {createClient}=require("../controllers/clientController");
const {protect}=require("../middleware/authMiddleware");

router.post("/",protect,createClient);

module.exports=router;