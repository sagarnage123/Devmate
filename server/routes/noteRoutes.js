const express=require("express");
const router=express.Router();

const {protect}=require("../middleware/authMiddleware");

const { createNote,getUserNotes,updateNote ,deleteNote } = require("../controllers/noteController");

router.post("/",protect,createNote);

router.get("/",protect,getUserNotes);

router.put("/:id",protect,updateNote);

router.delete("/:id",protect,deleteNote);

module.exports=router;


