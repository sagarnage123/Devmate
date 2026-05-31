import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import InvoiceForm from "@/components/InvoiceForm";
import { getInvoiceById, updateDraftInvoice } from "@/api/invoices";
import toast from "react-hot-toast";

export default function EditInvoice() {
    const { invoiceId, projectId } = useParams();
    const navigate = useNavigate();

    const [invoice, setInvoice] = useState<any>(null);

    useEffect(() => {
        const fetchInvoice = async () => {
            try {
                const res = await getInvoiceById(invoiceId!);

                if (res.data.data.status !== "draft") {
                    toast.error("Only draft invoices can be edited");
                    navigate(`/invoices/${invoiceId}`);
                    return;
                }
                setInvoice(res.data.data);

            } catch (err) {
                console.error("Failed to fetch invoice:", err);
                toast.error("Failed to load invoice");
            }
        };
        fetchInvoice();
    }, []);

    const handleUpdate = async (formData: any) => {
        await updateDraftInvoice(invoiceId!, formData);
        toast.success("Invoice updated successfully", {
            icon: "✅",
        });

        navigate(`/invoices/${invoiceId}`);
    };

    if (!invoice) return <div>Loading...</div>;

    return (
        <div className="text-white px-3 sm:px-4 md:px-6">
            <div className="max-w-4xl mx-auto space-y-6">


                <div className="flex gap-4
                mt-10
sm:flex-row sm:items-center sm:justify-between items-center justify-between">
                    <div>
                        <h1 className="text-lg font-semibold text-white ">
                            Edit Invoice
                        </h1>
                        <p className="self-start sm:self-auto text-slate-400 mt-1">
                            Update your draft invoice details
                        </p>
                    </div>

                    <button
                        onClick={() => navigate(`/invoices/${invoiceId}`)}
                        className="
                    text-sm text-slate-400 hover:text-white
                    transition-colors
                    "
                    >
                        ← Back
                    </button>
                </div>


                <div className="
            bg-[#111827] border border-white/10 rounded-xl overflow-hidden
            ">


                    <div className="
                px-4 py-4 sm:px-6 border-b border-white/10
                flex flex-col gap-3
sm:flex-row sm:items-center sm:justify-between
                ">

                        <div className="text-sm text-slate-400">
                            Editing draft invoice
                        </div>

                        <span className="
                        w-fit
                    text-xs px-2.5 py-1 rounded-full
                    bg-yellow-500/10 text-yellow-400 border border-yellow-500/20
                    ">
                            Draft
                        </span>

                    </div>

                    <div className="px-4 py-4 sm:px-6">
                        <InvoiceForm
                            initialData={{
                                lineItems: invoice.lineItems,
                                taxRate: invoice.taxRate,
                            }}
                            onSubmit={handleUpdate}
                            submitLabel="Update Invoice"
                        />
                    </div>

                </div>

            </div>
        </div>
    );
}