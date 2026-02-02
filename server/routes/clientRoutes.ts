import express from "express";
import { protect } from "../middleware/authMiddleware";
import {createClient,getClients} from "../controllers/clientController";


const router=express.Router();
router.post("/",protect,createClient);
router.get("/",protect,getClients);

export default router;