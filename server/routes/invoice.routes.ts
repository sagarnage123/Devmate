import express from "express";
import { createInvoice, duplicateInvoice, getInvoiceById, getInvoices, markInvoicePaid, sendInvoice, updateDraftInvoice } from "../controllers/invoice.controller";
import { updateDraftInvoiceService } from "../controllers/invoice.service";


const router = express.Router();

router.post("/", createInvoice);
router.get("/", getInvoices);
router.get("/:id", getInvoiceById);

router.patch("/:id/draft", updateDraftInvoice);
router.post("/:id/send", sendInvoice);
router.post("/:id/pay", markInvoicePaid);

router.post("/:id/duplicate", duplicateInvoice);

router.post("/:id/pay", duplicateInvoice);
export default router;