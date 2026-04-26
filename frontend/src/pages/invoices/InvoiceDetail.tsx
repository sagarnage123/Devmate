import { downloadInvoicePDF, duplicateInvoice, getInvoiceById, markInvoicePaid, sendInvoice } from "@/api/invoices";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

interface Invoice {
    _id: string;
    invoiceNumber: string;
    status: "draft" | "sent" | "paid" | "overdue";
    total: number;
    issueDate: string;
    dueDate?: string;

    clientId: {
        name: string;
        email?: string;
    };

    lineItems: {
        description: string;
        quantity: number;
        rate: number;
        total: number;
    }[];
}

export default function InvoiceDetail() {
    const { invoiceId, projectId } = useParams();
    if (!invoiceId) {
        return <div>Invalid invoice ID</div>;
    }
    const [invoice, setInvoice] = useState<Invoice | null>(null);
    const Navigate = useNavigate();
    const fetchInvoice = async () => {

        try {
            const res = await getInvoiceById(invoiceId);
            setInvoice(res.data.data);
        } catch (err) {
            console.error("Failed to fetch invoice:", err);
            toast.error("Failed to load invoice");
        }

    };

    useEffect(() => {
        fetchInvoice();
    }, [invoiceId]);

    const handleSend = async () => {
        await sendInvoice(invoiceId!);
        toast.success("Invoice sent successfully", {
            icon: "📤",
        });
        await fetchInvoice();

    };

    const markPaid = async () => {
        await markInvoicePaid(invoiceId!);
        toast.success("Invoice marked as paid", {
            icon: "✅",
        });
        await fetchInvoice();

    };

    const handleDownload = () => {
        downloadInvoicePDF(invoiceId!);
        toast.success("PDF downloaded successfully", {
            icon: "📥"
        });
    }
    const handleDuplicate = async () => {
        const res = await duplicateInvoice(invoiceId!);
        Navigate(`projects/${projectId}/invoices/${res.data._id}`);
    };


    if (!invoice) return <div>Loading...</div>;

    return (
        <div className="min-h-screen bg-[#0B0F19] text-white p-8">
            <div className="max-w-4xl mx-auto space-y-6">

               
                <div className="
            relative
            bg-gradient-to-b from-[#111827] to-[#0F172A]
            border border-white/10 rounded-xl p-6
            flex items-center justify-between
            overflow-hidden
            ">

                    
                    <div className="absolute -top-10 right-0 w-40 h-40 bg-indigo-500/10 blur-3xl pointer-events-none" />

                    
                    <div className="space-y-1">
                        <h1 className="text-lg font-semibold text-white tracking-tight">
                            {invoice.invoiceNumber}
                        </h1>

                        <p className="text-sm text-slate-400">
                            {invoice.clientId.name}
                        </p>
                    </div>

                   
                    <div className="flex items-center gap-2">

                        {invoice.status === "draft" && (
                            <>
                                <button
                                    onClick={handleSend}
                                    className="
                                px-4 py-2 rounded-lg text-sm font-medium
                                bg-blue-500 hover:bg-blue-400
                                shadow-md shadow-blue-500/20
                                transition-all duration-200 active:scale-[0.97]
                                "
                                >
                                    Send
                                </button>

                                <a
                                    href={`edit-invoice/${invoice._id}`}
                                    className="
                                px-4 py-2 rounded-lg text-sm
                                text-slate-300 hover:text-white
                                hover:bg-white/5
                                transition-all duration-200
                                "
                                >
                                    Edit
                                </a>
                            </>
                        )}

                        {(invoice.status === "sent" || invoice.status === "overdue") && (
                            <button
                                onClick={markPaid}
                                className="
                            px-4 py-2 rounded-lg text-sm font-medium
                            bg-emerald-500 hover:bg-emerald-400
                            shadow-md shadow-emerald-500/20
                            transition-all duration-200 active:scale-[0.97]
                            "
                            >
                                Mark Paid
                            </button>
                        )}

                        {invoice.status === "paid" && (
                            <span className="
                        inline-flex items-center gap-2 px-3 py-1 rounded-full
                        text-sm font-medium
                        bg-emerald-500/10 text-emerald-400 border border-emerald-500/20
                        ">
                                ✓ Paid
                            </span>
                        )}

                        <button
                            onClick={handleDownload}
                            className="
                        px-4 py-2 rounded-lg text-sm font-medium
                        bg-indigo-500 hover:bg-indigo-400
                        shadow-md shadow-indigo-500/20
                        transition-all duration-200 active:scale-[0.97]
                        "
                        >
                            PDF
                        </button>

                    </div>
                </div>

               
                <div className="
            flex items-center justify-between
            text-sm text-slate-400 px-1
            ">

                    <span>
                        Issue: {new Date(invoice.issueDate).toLocaleDateString()}
                    </span>

                    <span>
                        Due:{" "}
                        {invoice.dueDate
                            ? new Date(invoice.dueDate).toLocaleDateString()
                            : "-"}
                    </span>
                </div>

               
                <div className="
            bg-[#111827] border border-white/10 rounded-xl
            p-6 space-y-4
            ">

                    
                    <div className="grid grid-cols-4 text-xs text-slate-500 pb-2 border-b border-white/10">
                        <span>Description</span>
                        <span>Qty</span>
                        <span>Rate</span>
                        <span className="text-right">Total</span>
                    </div>

                    
                    <div className="space-y-3">
                        {invoice.lineItems.map((item, i) => (
                            <div
                                key={i}
                                className="
                            grid grid-cols-4 text-sm items-center
                            text-slate-300
                            "
                            >
                                <span className="text-slate-200">
                                    {item.description}
                                </span>

                                <span>{item.quantity}</span>

                                <span>₹{item.rate}</span>

                                <span className="text-right font-medium text-white">
                                    ₹{item.total.toFixed(2)}
                                </span>
                            </div>
                        ))}
                    </div>

                   
                    <div className="
                mt-6 pt-5 border-t border-white/10
                flex justify-end
                ">

                        <div className="
                    bg-[#0F172A] border border-white/10 rounded-lg px-5 py-3
                    text-right
                    ">

                            <p className="text-xs text-slate-400">
                                Total Amount
                            </p>

                            <p className="text-2xl font-semibold text-white tracking-tight">
                                ₹{invoice.total.toFixed(2)}
                            </p>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
}