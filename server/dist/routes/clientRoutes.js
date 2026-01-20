"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const clientController_1 = require("../controllers/clientController");
const router = express_1.default.Router();
router.post("/", authMiddleware_1.protect, clientController_1.createClient);
router.get("/", authMiddleware_1.protect, clientController_1.getClients);
exports.default = router;
