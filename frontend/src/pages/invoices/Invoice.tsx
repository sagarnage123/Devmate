import { getInvoices } from "@/api/invoices";

import { useEffect, useState } from "react";

type InvoiceStatus = "paid" | "draft" | "sent" | "overdue";


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
                const data = await getInvoices();
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
    const StatusBadge = ({ status }: { status: InvoiceStatus }) => {
        const styles = {
            paid: "bg-green-500/10 text-green-400 border-green-500/20 w-max",
            draft: "bg-gray-500/10 text-gray-400 border-gray-500/20 w-max",
            sent: "bg-blue-500/10 text-blue-400 border-blue-500/20 w-max",
            overdue: "bg-red-500/10 text-red-400 border-red-500/20 w-max",
        };

        return (
            <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm border ${styles[status]} capitalize text-xs font-medium`}>
                {status}
            </span>
        );
    };
    return (
        <div className="min-h-screen bg-[#0B0F19] text-white p-8 
">
            <div className="max-w-5xl mx-auto">


                <div className="
                sticky top-6
                              z-20 flex justify-between my-8
                          
                            bg-[#0B0F19]
                            pb-4
                            ">
                    <h1 className="text-2xl font-semibold">Invoices</h1>

                    <a
                        href="invoices/create-invoice"
                        className="bg-indigo-600 hover:bg-indigo-500 px-5 py-2 rounded-lg"
                    >
                        + New Invoice
                    </a>
                </div>


                <div className="
grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
gap-4 h-[calc(95vh-120px)]
overflow-y-auto
pr-1
no-scrollbar
">
                    {invoices.map((inv) => (
                        <a
                            key={inv._id}
                            href={`invoices/${inv._id}`}
                            className="
    group
    bg-[#111827] border border-white/10 rounded-xl p-4

    flex flex-col justify-between

    transition-all duration-200 ease-out
    hover:border-indigo-500/30 hover:-translate-y-[2px]
    hover:shadow-lg hover:shadow-indigo-500/10
    "
                        >

                            
                            <div className="space-y-2">

                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-slate-200">
                                        {inv.invoiceNumber}
                                    </span>

                                    <StatusBadge status={inv.status} />
                                </div>

                                <p className="text-sm text-slate-400">
                                    {inv.clientId?.name}
                                </p>

                            </div>

                           
                            <div className="mt-4 flex items-end justify-between">

                                <p className="text-lg font-semibold text-white tracking-tight">
                                    ₹{inv.total.toFixed(2)}
                                </p>

                                <p className="text-xs text-slate-500">
                                    {new Date(inv.issueDate).toLocaleDateString()}
                                </p>

                            </div>

                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}