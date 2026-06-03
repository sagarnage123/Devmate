"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInvoiceForPDFService = exports.duplicateInvoiceService = exports.markInvoicePaidService = exports.sendInvoiceService = exports.updateDraftInvoiceService = exports.getInvoiceByIdService = exports.getInvoicesService = exports.createInvoiceService = void 0;
const Invoice_1 = __importDefault(require("../models/Invoice"));
const invoice_utils_1 = require("../utils/invoice.utils");
const mongoose_1 = require("mongoose");
const invoiceNumber_1 = require("../utils/invoiceNumber");
const createInvoiceService = async (userId, data) => {
    const { clientId, projectId, lineItems, taxRate = 0, issueDate, dueDate, notes, } = data;
    const { lineItems: computedItems, subtotal, taxAmount, total } = (0, invoice_utils_1.calculateInvoiceTotals)(lineItems, taxRate);
    const invoiceNumber = await (0, invoiceNumber_1.generateInvoiceNumber)(userId);
    const invoice = await Invoice_1.default.create({
        userId,
        clientId,
        projectId,
        invoiceNumber,
        issueDate,
        dueDate,
        notes,
        lineItems: computedItems,
        subtotal,
        taxRate,
        taxAmount,
        total,
    });
    return invoice;
};
exports.createInvoiceService = createInvoiceService;
const getInvoicesService = async (userId, query) => {
    const { page = "1", limit = "10", status, clientId } = query;
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const filter = {
        userId,
    };
    if (status) {
        filter.status = status;
    }
    if (clientId) {
        filter.clientId = clientId;
    }
    const skip = (pageNumber - 1) * limitNumber;
    const [invoices, total] = await Promise.all([
        Invoice_1.default.find(filter)
            .populate("clientId", "name email")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNumber)
            .lean(),
        Invoice_1.default.countDocuments(filter),
    ]);
    return {
        data: invoices,
        pagination: {
            total,
            page: pageNumber,
            limit: limitNumber,
            pages: Math.ceil(total / limitNumber),
        },
    };
};
exports.getInvoicesService = getInvoicesService;
const getInvoiceByIdService = async (userId, invoiceId) => {
    if (!mongoose_1.Types.ObjectId.isValid(invoiceId)) {
        throw new Error("Invalid invoice ID");
    }
    const invoice = await Invoice_1.default.findOne({
        _id: invoiceId,
        userId,
    })
        .populate("clientId", "name email")
        .populate("projectId", "title")
        .lean();
    if (!invoice) {
        throw new Error("Invoice not found");
    }
    return invoice;
};
exports.getInvoiceByIdService = getInvoiceByIdService;
const updateDraftInvoiceService = async (userId, invoiceId, data) => {
    if (!mongoose_1.Types.ObjectId.isValid(invoiceId)) {
        throw new Error("Invalid invoice ID");
    }
    const invoice = await Invoice_1.default.findOne({
        _id: invoiceId,
        userId,
    });
    if (!invoice) {
        throw new Error("Invoice not found");
    }
    if (invoice.status !== "draft") {
        throw new Error("Only draft invoices can be edited");
    }
    const taxRate = data.taxRate ?? invoice.taxRate;
    const { lineItems, subtotal, taxAmount, total } = (0, invoice_utils_1.calculateInvoiceTotals)(data.lineItems, taxRate);
    invoice.lineItems = lineItems;
    invoice.subtotal = subtotal;
    invoice.taxRate = taxRate;
    invoice.taxAmount = taxAmount;
    invoice.total = total;
    if (data.dueDate)
        invoice.dueDate = new Date(data.dueDate);
    if (data.notes !== undefined)
        invoice.notes = data.notes;
    await invoice.save();
    return invoice;
};
exports.updateDraftInvoiceService = updateDraftInvoiceService;
const sendInvoiceService = async (userId, invoiceId) => {
    const invoice = await Invoice_1.default.findOne({ _id: invoiceId, userId });
    if (!invoice)
        throw new Error("Invoice not found");
    if (invoice.status !== "draft") {
        throw new Error("Only draft invoices can be sent");
    }
    invoice.status = "sent";
    await invoice.save();
    return invoice;
};
exports.sendInvoiceService = sendInvoiceService;
const markInvoicePaidService = async (userId, invoiceId) => {
    const invoice = await Invoice_1.default.findOne({ _id: invoiceId, userId });
    if (!invoice)
        throw new Error("Invoice not found");
    if (invoice.status !== "sent" && invoice.status !== "overdue") {
        throw new Error("Only sent/overdue invoices can be paid");
    }
    invoice.status = "paid";
    invoice.paidAt = new Date();
    await invoice.save();
    return invoice;
};
exports.markInvoicePaidService = markInvoicePaidService;
const duplicateInvoiceService = async (userId, invoiceId) => {
    const existing = await Invoice_1.default.findOne({
        _id: invoiceId,
        userId,
    });
    if (!existing) {
        throw new Error("Invoice not found");
    }
    const newInvoiceNumber = await (0, invoiceNumber_1.generateInvoiceNumber)(userId);
    const duplicated = await Invoice_1.default.create({
        userId: existing.userId,
        clientId: existing.clientId,
        projectId: existing.projectId,
        invoiceNumber: newInvoiceNumber,
        issueDate: new Date(),
        dueDate: existing.dueDate,
        currency: existing.currency,
        lineItems: existing.lineItems,
        subtotal: existing.subtotal,
        taxRate: existing.taxRate,
        taxAmount: existing.taxAmount,
        total: existing.total,
        status: "draft",
        notes: existing.notes,
    });
    return duplicated;
};
exports.duplicateInvoiceService = duplicateInvoiceService;
const getInvoiceForPDFService = async (userId, invoiceId) => {
    if (!mongoose_1.Types.ObjectId.isValid(invoiceId)) {
        throw new Error("Invalid invoice ID");
    }
    const invoice = await Invoice_1.default.findOne({
        _id: invoiceId,
        userId,
    })
        .populate("clientId", "name email")
        .lean();
    if (!invoice) {
        throw new Error("Invoice not found");
    }
    return {
        invoiceNumber: invoice.invoiceNumber,
        issueDate: invoice.issueDate,
        dueDate: invoice.dueDate,
        client: {
            name: invoice.clientId.name,
            email: invoice.clientId.email,
        },
        lineItems: invoice.lineItems,
        subtotal: invoice.subtotal,
        taxAmount: invoice.taxAmount,
        total: invoice.total,
        notes: invoice.notes,
    };
};
exports.getInvoiceForPDFService = getInvoiceForPDFService;
