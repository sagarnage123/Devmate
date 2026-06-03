"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadInvoicePDF = exports.markInvoicePaid = exports.sendInvoice = exports.updateDraftInvoice = exports.duplicateInvoice = exports.getInvoiceById = exports.getInvoices = exports.createInvoice = void 0;
const invoice_service_1 = require("./invoice.service");
const invoice_validation_1 = require("../validations/invoice.validation");
const invoice_service_2 = require("./invoice.service");
const invoice_pdf_1 = require("../utils/invoice.pdf");
const createInvoice = async (req, res) => {
    try {
        const userId = req.user._id;
        (0, invoice_validation_1.validateCreateInvoice)(req.body);
        const invoice = await (0, invoice_service_1.createInvoiceService)(userId, req.body);
        res.status(201).json({
            success: true,
            data: invoice,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
exports.createInvoice = createInvoice;
const getInvoices = async (req, res) => {
    try {
        const userId = req.user._id;
        const result = await (0, invoice_service_2.getInvoicesService)(userId, req.query);
        res.status(200).json({
            success: true,
            ...result,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
exports.getInvoices = getInvoices;
const getInvoiceById = async (req, res) => {
    try {
        const userId = req.user._id;
        const invoice = await (0, invoice_service_1.getInvoiceByIdService)(userId, req.params.id);
        res.status(200).json({
            success: true,
            data: invoice,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.message === "Invoice not found") {
                res.status(404).json({
                    success: false,
                    message: error.message,
                });
            }
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
exports.getInvoiceById = getInvoiceById;
const duplicateInvoice = async (req, res) => {
    try {
        const userId = req.user._id;
        const invoiceId = req.params.id;
        if (!invoiceId || typeof invoiceId !== "string") {
            return res.status(400).json({
                success: false,
                message: "Invoice ID is required",
            });
        }
        const invoice = await (0, invoice_service_1.duplicateInvoiceService)(userId, invoiceId);
        res.status(201).json({
            success: true,
            data: invoice,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
exports.duplicateInvoice = duplicateInvoice;
const updateDraftInvoice = async (req, res) => {
    try {
        const userId = req.user._id;
        const invoice = await (0, invoice_service_1.updateDraftInvoiceService)(userId, req.params.id, req.body);
        res.status(200).json({
            success: true,
            data: invoice,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
exports.updateDraftInvoice = updateDraftInvoice;
const sendInvoice = async (req, res) => {
    try {
        const userId = req.user._id;
        const invoice = await (0, invoice_service_1.sendInvoiceService)(userId, req.params.id);
        res.status(200).json({
            success: true,
            data: invoice,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
exports.sendInvoice = sendInvoice;
const markInvoicePaid = async (req, res) => {
    try {
        const userId = req.user._id;
        const invoice = await (0, invoice_service_1.markInvoicePaidService)(userId, req.params.id);
        res.status(200).json({
            success: true,
            data: invoice,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
exports.markInvoicePaid = markInvoicePaid;
const downloadInvoicePDF = async (req, res) => {
    try {
        const userId = req.user._id;
        const data = await (0, invoice_service_1.getInvoiceForPDFService)(userId, req.params.id);
        (0, invoice_pdf_1.generateInvoicePDF)(data, res);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
exports.downloadInvoicePDF = downloadInvoicePDF;
