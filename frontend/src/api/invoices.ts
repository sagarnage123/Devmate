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

export const getInvoiceById = (id: string) =>
    apiCall(() => api.get(`/invoices/${id}`));

export const sendInvoice = (id: string) =>
    apiCall(() => api.post(`/invoices/${id}/send`));

export const markInvoicePaid = (id: string) =>
    apiCall(() => api.post(`/invoices/${id}/pay`));

export const updateDraftInvoice = (id: string, data: any) =>
    apiCall(() => api.patch(`/invoices/${id}/draft`, data));

export const duplicateInvoice = (id: string) =>
    apiCall(() => api.post(`/invoices/${id}/duplicate`));

export const downloadInvoicePDF = (id: string) => {
    window.open(`/api/invoices/${id}/pdf`);
};
    