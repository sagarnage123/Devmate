"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const taskController_1 = require("../controllers/taskController");
const router = express_1.default.Router();
router.post("/", authMiddleware_1.protect, taskController_1.createTask);
router.get("/", authMiddleware_1.protect, taskController_1.getTask);
router.put("/:id", authMiddleware_1.protect, taskController_1.updateTask);
router.delete("/:id", authMiddleware_1.protect, taskController_1.deleteTask);
exports.default = router;
