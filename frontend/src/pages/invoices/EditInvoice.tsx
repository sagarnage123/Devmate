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

                if(res.data.data.status !== "draft") {  
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
        <div className="min-h-screen bg-[#0B0F19] text-white p-8">
            <div className="max-w-5xl mx-auto bg-[#111827] rounded-2xl p-8">

                <h1 className="text-xl font-semibold mb-6">
                    Edit Invoice
                </h1>

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
    );
}