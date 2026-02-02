"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const getUserTags_1 = require("../controllers/getUserTags");
const router = express_1.default.Router();
router.get("/", authMiddleware_1.protect, getUserTags_1.getUserTags);
exports.default = router;
