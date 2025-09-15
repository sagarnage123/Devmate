const express=require("express");
const {createProject,getProject, updateProject,deleteProject}=require("../controllers/projectController");
const {protect}=require("../middleware/authMiddleware.js");

const router=express.Router();

router.post("/",protect,createProject);
router.get("/",protect,getProject);
router.put("/:id",protect,updateProject);
router.delete("/:id",protect,deleteProject);

module.exports=router;