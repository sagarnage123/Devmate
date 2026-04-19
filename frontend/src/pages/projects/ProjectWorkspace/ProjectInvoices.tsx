import { getInvoices } from "@/api/invoices";

import { useEffect, useState } from "react";

interface Invoice {
    _id: string;
    invoiceNumber: string;
    clientId: {
        name: string;
    };
    total: number;
    status: "draft" | "sent" | "paid" | "overdue";
    issueDate: string;
}

export default function Invoices() {
    const [invoices, setInvoices] = useState<Invoice[]>([]);

    useEffect(() => {
        async function fetchInvoices() {
            try {
                const data=await getInvoices();
                setInvoices(data);
            } catch (err) {
                console.error("Failed to fetch invoices:", err);
            }
        }

        fetchInvoices();
     
    }, []);

    const getStatusColor = (status: Invoice["status"]) => {
        switch (status) {
            case "draft":
                return "bg-gray-600";
            case "sent":
                return "bg-blue-600";
            case "paid":
                return "bg-green-600";
            case "overdue":
                return "bg-red-600";
        }
    };

    return (
        <div className="min-h-screen bg-[#0B0F19] text-white p-8">
            <div className="max-w-6xl mx-auto">

               
                <div className="flex justify-between mb-8">
                    <h1 className="text-2xl font-semibold">Invoices</h1>

                    <a
                        href="invoices/create-invoice"
                        className="bg-indigo-600 hover:bg-indigo-500 px-5 py-2 rounded-lg"
                    >
                        + New Invoice
                    </a>
                </div>

                
                <div className="bg-[#111827] rounded-2xl overflow-hidden">

                    <div className="grid grid-cols-5 px-6 py-3 text-sm text-gray-400 border-b border-gray-700">
                        <span>Invoice</span>
                        <span>Client</span>
                        <span>Status</span>
                        <span>Total</span>
                        <span>Date</span>
                    </div>

                    {invoices.map((inv) => (
                        <a
                            key={inv._id}
                            href={`/invoices/${inv._id}`}
                            className="grid grid-cols-5 px-6 py-4 border-b border-gray-800 hover:bg-[#1F2937] transition"
                        >
                            <span>{inv.invoiceNumber}</span>
                            <span>{inv.clientId?.name}</span>

                            <span>
                                <span
                                    className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                                        inv.status
                                    )}`}
                                >
                                    {inv.status}
                                </span>
                            </span>

                            <span>₹{inv.total.toFixed(2)}</span>
                            <span>
                                {new Date(inv.issueDate).toLocaleDateString()}
                            </span>
                        </a>
                    ))}

                </div>
            </div>
        </div>
    );
}