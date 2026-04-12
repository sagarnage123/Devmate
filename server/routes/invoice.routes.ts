import express from "express";
import { createInvoice, downloadInvoicePDF, duplicateInvoice, getInvoiceById, getInvoices, markInvoicePaid, sendInvoice, updateDraftInvoice } from "../controllers/invoice.controller";



const router = express.Router();

router.post("/", createInvoice);
router.get("/", getInvoices);
router.get("/:id", getInvoiceById);

router.patch("/:id/draft", updateDraftInvoice);
router.post("/:id/send", sendInvoice);
router.post("/:id/pay", markInvoicePaid);

router.post("/:id/duplicate", duplicateInvoice);
router.get("/:id/pdf", downloadInvoicePDF);

export default router;