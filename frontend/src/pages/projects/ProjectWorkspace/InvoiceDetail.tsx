import { downloadInvoicePDF, duplicateInvoice, getInvoiceById, markInvoicePaid,sendInvoice } from "@/api/invoices";
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
    const { invoiceId,projectId } = useParams();
    if(!invoiceId) {
        return <div>Invalid invoice ID</div>;
    }
    const [invoice, setInvoice] = useState<Invoice | null>(null);
    const Navigate = useNavigate();
    

    useEffect(() => {
        const fetchInvoice = async () => {

            try {
                const res = await getInvoiceById(invoiceId);
                setInvoice(res.data.data);
                toast.success("Invoice loaded successfully", {
                    icon: "✅",
                });
            } catch (err) {
                console.error("Failed to fetch invoice:", err);
                toast.error("Failed to load invoice");
            }

        };
        fetchInvoice();
    }, []);

    const handleSend = async () => {
        await sendInvoice(invoiceId!);
        toast.success("Invoice sent successfully", {
            icon: "📤",
        });
        
    };

    const markPaid = async () => {
        await markInvoicePaid(invoiceId!);
        toast.success("Invoice marked as paid", {
            icon: "✅",
        });
        
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
            <div className="max-w-4xl mx-auto bg-[#111827] rounded-2xl p-8">

                
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-xl font-semibold">
                            {invoice.invoiceNumber}
                        </h1>
                        <p className="text-gray-400 text-sm">
                            {invoice.clientId.name}
                        </p>
                    </div>

                    <div className="flex gap-2">
                        {invoice.status === "draft" && (
                            <>
                                <button
                                    onClick={handleSend}
                                    className="bg-blue-600 px-4 py-2 rounded-lg"
                                >
                                    Send
                                </button>

                                <a
                                    href={`edit-invoice/${invoice._id}`}
                                    className="bg-gray-600 px-4 py-2 rounded-lg"
                                >
                                    Edit
                                </a>
                            </>
                        )}

                        {(invoice.status === "sent" ||
                            invoice.status === "overdue") && (
                                <button
                                    onClick={markPaid}
                                    className="bg-green-600 px-4 py-2 rounded-lg"
                                >
                                    Mark Paid
                                </button>
                            )}

                        <button
                            onClick={handleDownload}
                            className="bg-indigo-600 px-4 py-2 rounded-lg"
                        >
                            PDF
                        </button>
                    </div>
                </div>

               
                <div className="flex justify-between text-sm text-gray-400 mb-6">
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

               
                <div className="space-y-3">
                    {invoice.lineItems.map((item, i) => (
                        <div
                            key={i}
                            className="grid grid-cols-4 border-b border-gray-700 pb-2"
                        >
                            <span>{item.description}</span>
                            <span>{item.quantity}</span>
                            <span>₹{item.rate}</span>
                            <span className="text-right">
                                ₹{item.total.toFixed(2)}
                            </span>
                        </div>
                    ))}
                </div>

                
                <div className="mt-6 text-right text-lg font-semibold">
                    Total: ₹{invoice.total.toFixed(2)}
                </div>

            </div>
        </div>
    );
}