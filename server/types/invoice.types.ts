import { Types } from "mongoose";

export interface InvoiceQuery {
    page?: string;
    limit?: string;
    status?: "draft" | "sent" | "paid" | "overdue";
    clientId?: string;
}

export interface CreateInvoiceInput {
    clientId: string;
    projectId?: string;
    issueDate: string;
    dueDate?: string;
    taxRate?: number;
    notes?: string;
    lineItems: {
        description: string;
        quantity: number;
        rate: number;
    }[];
}

export interface InvoiceResponse {
    _id: Types.ObjectId;
    invoiceNumber: string;
    clientId: Types.ObjectId;
    total: number;
    status: string;
    issueDate: Date;
    dueDate?: Date;
}

export interface InvoiceParams {
    id: string;
}

export interface PopulatedInvoice {
    _id: Types.ObjectId;
    invoiceNumber: string;

    clientId: {
        _id: Types.ObjectId;
        name: string;
        email?: string;
    };

    projectId?: {
        _id: Types.ObjectId;
        name: string;
    };

    total: number;
    status: "draft" | "sent" | "paid" | "overdue";

    issueDate: Date;
    dueDate?: Date;

    lineItems: {
        description: string;
        quantity: number;
        rate: number;
        total: number;
    }[];
}