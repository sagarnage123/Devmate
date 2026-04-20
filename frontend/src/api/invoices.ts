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

export const downloadInvoicePDF= async (id: string) => {
    const token = localStorage.getItem("token");

    const res = await api.get(`/invoices/${id}/pdf`, {
        responseType: "blob",
    });
    const blob = await res.data;

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `invoice-${id}.pdf`;
    a.click();

    window.URL.revokeObjectURL(url);
};
    