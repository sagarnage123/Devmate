import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import InvoiceForm from "@/components/InvoiceForm";

export default function EditInvoice() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [invoice, setInvoice] = useState<any>(null);

    useEffect(() => {
        fetch(`/api/invoices/${id}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.data.status !== "draft") {
                    alert("Only draft invoices can be edited");
                    navigate("/invoices");
                }
                setInvoice(data.data);
            });
    }, []);

    const handleUpdate = async (formData: any) => {
        await fetch(`/api/invoices/${id}/draft`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        navigate(`/invoices/${id}`);
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