"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const noteController_1 = require("../controllers/noteController");
const router = express_1.default.Router();
router.post("/", authMiddleware_1.protect, noteController_1.createNote);
router.put("/:id", authMiddleware_1.protect, noteController_1.updateNote);
router.get("/:projectId", authMiddleware_1.protect, noteController_1.getNotesByProject);
router.delete("/:id", authMiddleware_1.protect, noteController_1.deleteNote);
exports.default = router;
