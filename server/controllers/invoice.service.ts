import Invoice from "../models/Invoice";
import { calculateInvoiceTotals } from "../utils/invoice.utils";
import { Types } from "mongoose";
import { InvoiceQuery } from "../types/invoice.types";
import { FilterQuery } from "mongoose";
import { generateInvoiceNumber } from "../utils/invoiceNumber";
export const createInvoiceService = async (userId: Types.ObjectId, data: any) => {
    const {
        clientId,
        projectId,
        lineItems,
        taxRate = 0,
        issueDate,
        dueDate,
        notes,
    } = data;

    
    const { lineItems: computedItems, subtotal, taxAmount, total } =
        calculateInvoiceTotals(lineItems, taxRate);

    
    const invoiceNumber = await generateInvoiceNumber(userId);

    const invoice = await Invoice.create({
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

export const getInvoicesService = async (
    userId: Types.ObjectId,
    query: InvoiceQuery
) => {
    const { page = "1", limit = "10", status, clientId } = query;

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    const filter: FilterQuery<any> = {
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
        Invoice.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNumber)
            .lean(),

        Invoice.countDocuments(filter),
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

export const getInvoiceByIdService = async (
    userId: Types.ObjectId,
    invoiceId: string
) => {
    if (!Types.ObjectId.isValid(invoiceId)) {
        throw new Error("Invalid invoice ID");
    }

    const invoice = await Invoice.findOne({
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

export const updateDraftInvoiceService = async (
    userId: Types.ObjectId,
    invoiceId: string,
    data: {
        lineItems: {
            description: string;
            quantity: number;
            rate: number;
        }[];
        taxRate?: number;
        dueDate?: string;
        notes?: string;
    }
) => {
    if (!Types.ObjectId.isValid(invoiceId)) {
        throw new Error("Invalid invoice ID");
    }

    const invoice = await Invoice.findOne({
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

    const { lineItems, subtotal, taxAmount, total } =
        calculateInvoiceTotals(data.lineItems, taxRate);

    invoice.lineItems = lineItems;
    invoice.subtotal = subtotal;
    invoice.taxRate = taxRate;
    invoice.taxAmount = taxAmount;
    invoice.total = total;

    if (data.dueDate) invoice.dueDate = new Date(data.dueDate);
    if (data.notes !== undefined) invoice.notes = data.notes;

    await invoice.save();

    return invoice;
};
export const sendInvoiceService = async (
    userId: Types.ObjectId,
    invoiceId: string
) => {
    const invoice = await Invoice.findOne({ _id: invoiceId, userId });

    if (!invoice) throw new Error("Invoice not found");

    if (invoice.status !== "draft") {
        throw new Error("Only draft invoices can be sent");
    }

    invoice.status = "sent";
    await invoice.save();

    return invoice;
};

export const markInvoicePaidService = async (
    userId: Types.ObjectId,
    invoiceId: string
) => {
    const invoice = await Invoice.findOne({ _id: invoiceId, userId });

    if (!invoice) throw new Error("Invoice not found");

    if (invoice.status !== "sent" && invoice.status !== "overdue") {
        throw new Error("Only sent/overdue invoices can be paid");
    }

    invoice.status = "paid";
    invoice.paidAt = new Date();

    await invoice.save();

    return invoice;
};

export const duplicateInvoiceService = async (
    userId: Types.ObjectId,
    invoiceId: string
) => {
    const existing = await Invoice.findOne({
        _id: invoiceId,
        userId,
    });

    if (!existing) {
        throw new Error("Invoice not found");
    }

    const newInvoiceNumber = await generateInvoiceNumber(userId);

    const duplicated = await Invoice.create({
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

export const getInvoiceForPDFService = async (
    userId: Types.ObjectId,
    invoiceId: string
) => {
    if (!Types.ObjectId.isValid(invoiceId)) {
        throw new Error("Invalid invoice ID");
    }

    const invoice = await Invoice.findOne({
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
            name: (invoice.clientId as any).name,
            email: (invoice.clientId as any).email,
        },

        lineItems: invoice.lineItems,

        subtotal: invoice.subtotal,
        taxAmount: invoice.taxAmount,
        total: invoice.total,

        notes: invoice.notes,
    };
};