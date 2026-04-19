import { apiCall } from "./apiCall";
import api from "./axios";

export async function createInvoice(payload: {
    clientId: string;
    lineItems: {
        description: string;
        quantity: number;
        rate: number;
        total: number;
    }[];
    taxRate: number;
    issueDate: string;
    dueDate?: string;
}) {
    return apiCall(() => api.post("/invoices", payload));
}

export async function getInvoices() {
    return apiCall(() => api.get("/invoices").then((res) => res.data.data));
}
    