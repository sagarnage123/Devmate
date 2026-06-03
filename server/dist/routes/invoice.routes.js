"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const invoice_controller_1 = require("../controllers/invoice.controller");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post("/", authMiddleware_1.protect, invoice_controller_1.createInvoice);
router.get("/", authMiddleware_1.protect, invoice_controller_1.getInvoices);
router.get("/:id", authMiddleware_1.protect, invoice_controller_1.getInvoiceById);
router.patch("/:id/draft", authMiddleware_1.protect, invoice_controller_1.updateDraftInvoice);
router.post("/:id/send", authMiddleware_1.protect, invoice_controller_1.sendInvoice);
router.post("/:id/pay", authMiddleware_1.protect, invoice_controller_1.markInvoicePaid);
router.post("/:id/duplicate", authMiddleware_1.protect, invoice_controller_1.duplicateInvoice);
router.get("/:id/pdf", authMiddleware_1.protect, invoice_controller_1.downloadInvoicePDF);
exports.default = router;
