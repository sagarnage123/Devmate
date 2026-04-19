import express from "express";
import { createInvoice, downloadInvoicePDF, duplicateInvoice, getInvoiceById, getInvoices, markInvoicePaid, sendInvoice, updateDraftInvoice } from "../controllers/invoice.controller";
import { protect } from "../middleware/authMiddleware";



const router = express.Router();

router.post("/",protect, createInvoice);
router.get("/",protect, getInvoices);
// router.get("/:id", protect, getInvoiceById);

router.patch("/:id/draft",protect, updateDraftInvoice);
router.post("/:id/send", protect, sendInvoice);
router.post("/:id/pay", protect, markInvoicePaid);

router.post("/:id/duplicate", protect, duplicateInvoice);
router.get("/:id/pdf", protect, downloadInvoicePDF);

export default router;