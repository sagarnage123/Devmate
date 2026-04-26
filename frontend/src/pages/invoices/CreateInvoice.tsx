import { useState } from "react";
import  { Client } from "@/types/Client";
import ClientSelector from "@/components/ClientSelector";
import { createInvoice } from "@/api/invoices";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
interface LineItem {
    description: string;
    quantity: number;
    rate: number;
    total: number;
}

export default function CreateInvoice() {
    
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    
    const [lineItems, setLineItems] = useState<LineItem[]>([]);
    const [taxRate, setTaxRate] = useState<number>(0);

    const [creating, setCreating] = useState(false);
    const [issueDate, setIssueDate] = useState("");
    const [dueDate, setDueDate] = useState("");
    const { projectId } = useParams();
    const navigate = useNavigate();
    
    

    const updateItem = (
        index: number,
        field: keyof LineItem,
        value: string | number
    ) => {
        setLineItems((prev) =>
            prev.map((item, i) => {
                if (i !== index) return item;
                const updated = { ...item, [field]: value };
                return {
                    ...updated,
                    total: updated.quantity * updated.rate,
                };
            })
        );
    };

    const addItem = () => {
        setLineItems((prev) => [
            ...prev,
            { description: "", quantity: 1, rate: 0, total: 0 },
        ]);
    };

    const removeItem = (index: number) => {
        setLineItems((prev) => prev.filter((_, i) => i !== index));
    };

    const subtotal = lineItems.reduce((s, i) => s + i.total, 0);
    const taxAmount = (subtotal * taxRate) / 100;
    const total = subtotal + taxAmount;

    const isValid = selectedClient && lineItems.length > 0;
    return (
        <div className="min-h-screen bg-[#0B0F19] text-white p-8">
            <div className="max-w-4xl mx-auto">

                <div className="bg-[#111827] border border-white/10 rounded-xl overflow-hidden">

                    
                    <div className="px-6 py-5 border-b border-white/10 flex justify-between items-center">
                        <div>
                            <h1 className="text-lg font-semibold">New Invoice</h1>
                            <p className="text-sm text-slate-400">Create invoice details</p>
                        </div>

                        <button
                            disabled={!isValid}
                            onClick={async () => {
                                if (!selectedClient) return;

                                try {
                                    setCreating(true);

                                    await createInvoice({
                                        clientId: selectedClient.id,
                                        lineItems,
                                        taxRate,
                                        issueDate: issueDate || Date.now().toString().split("T")[0],
                                        dueDate: dueDate || undefined,
                                    });

                                    toast.success("Invoice created successfully!", { icon: "✅" });
                                    navigate(`/invoices`);

                                } catch (err) {
                                    console.error(err);
                                    toast.error("Failed to create invoice.", { icon: "❌" });
                                } finally {
                                    setCreating(false);
                                }
                            }}
                            className={`
                        px-4 py-2 rounded-lg text-sm font-medium transition
                        ${isValid
                                    ? "bg-indigo-500 hover:bg-indigo-400"
                                    : "bg-slate-700 text-slate-400 cursor-not-allowed"}
                        `}
                        >
                            Save Draft
                        </button>
                    </div>

                   <div className="px-6 py-4 border-b border-white/10">
                        <ClientSelector
                            selectedClient={selectedClient}
                            setSelectedClient={setSelectedClient}
                        />
                    </div>

                   
                    <div className="px-6 py-5">

                        {lineItems.length === 0 && (
                            <div className="text-center py-12 text-slate-500 border border-dashed border-white/10 rounded-lg">
                                No items yet. Start by adding one.
                            </div>
                        )}

                        {lineItems.length > 0 && (
                            <>
                               
                                <div className="grid grid-cols-12 gap-4 text-xs text-slate-500 pb-3 border-b border-white/10">
                                    <span className="col-span-5">Description</span>
                                    <span className="col-span-2">Qty</span>
                                    <span className="col-span-2">Rate</span>
                                    <span className="col-span-2 text-right">Total</span>
                                    <span className="col-span-1" />
                                </div>

                               
                                <div className="divide-y divide-white/10">
                                    {lineItems.map((item, index) => (
                                        <div
                                            key={index}
                                            className="grid grid-cols-12 gap-4 items-center py-3 group"
                                        >
                                            <input
                                                autoFocus={index === lineItems.length - 1}
                                                placeholder="Item description"
                                                value={item.description}
                                                onChange={(e) =>
                                                    updateItem(index, "description", e.target.value)
                                                }
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") addItem();
                                                }}
                                                className="col-span-5 bg-transparent text-sm outline-none placeholder:text-slate-500"
                                            />

                                            <input
                                                type="number"
                                               
                                                value={item.quantity}
                                                onChange={(e) =>
                                                    updateItem(index, "quantity", Number(e.target.value))
                                                }
                                                className="col-span-2 bg-transparent text-sm border rounded-lg outline-slate-50"
                                            />

                                            <input
                                                type="number"
                                                
                                                value={item.rate}
                                                onChange={(e) =>
                                                    updateItem(index, "rate", Number(e.target.value))
                                                }
                                                className="col-span-2 bg-transparent text-sm border rounded-lg"
                                            />

                                            <div className="col-span-2 text-right text-sm font-medium text-white">
                                                ₹{item.total.toFixed(2)}
                                            </div>

                                            <button
                                                onClick={() => removeItem(index)}
                                                className="col-span-1 text-red-400 opacity-0 group-hover:opacity-100 transition"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                       
                        <button
                            onClick={addItem}
                            className="mt-4 text-sm text-indigo-400 hover:text-indigo-300"
                        >
                            + Add Item
                        </button>

                    </div>

                    
                    {lineItems.length > 0 && (
                        <div className="px-6 py-5 border-t border-white/10 flex justify-end">
                            <div className="w-72 space-y-3 text-sm">

                                <div className="flex justify-between text-slate-400">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal.toFixed(2)}</span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400">Tax (%)</span>
                                    <input
                                        type="number"
                                        value={taxRate}
                                        onChange={(e) => setTaxRate(Number(e.target.value))}
                                        className="w-16 bg-transparent text-right outline-none"
                                    />
                                </div>

                                <div className="flex justify-between text-slate-400">
                                    <span>Tax</span>
                                    <span>₹{taxAmount.toFixed(2)}</span>
                                </div>

                                <div className="border-t border-white/10 pt-3 flex justify-between text-base font-semibold">
                                    <span>Total</span>
                                    <span>₹{total.toFixed(2)}</span>
                                </div>

                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}