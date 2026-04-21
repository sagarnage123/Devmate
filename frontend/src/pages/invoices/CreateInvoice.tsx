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
            <div className="max-w-6xl mx-auto bg-[#111827] rounded-2xl p-8 shadow-xl">

                
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-semibold">New Invoice</h1>

                    <button
                        disabled={!isValid}
                        className={`px-5 py-2 rounded-lg font-medium ${isValid
                                ? "bg-indigo-600 hover:bg-indigo-500"
                                : "bg-gray-700 cursor-not-allowed"
                            }`}
                        onClick={async () => {
                            if (!selectedClient) return;

                            try {
                                setCreating(true);
                                
                                await createInvoice({
                                    clientId: selectedClient.id,
                                    lineItems,
                                    taxRate,
                                    issueDate:issueDate || Date.now().toString().split("T")[0],
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
                    >
                        Save Draft
                    </button>
                </div>

              
                <ClientSelector
                    selectedClient={selectedClient}
                    setSelectedClient={setSelectedClient}
                />

               
                {lineItems.length === 0 && (
                    <div className="text-center py-16 text-gray-500 border border-dashed border-gray-700 rounded-xl">
                        No items yet. Start by adding one.
                    </div>
                )}

               
                {lineItems.length > 0 && (
                    <div className="grid grid-cols-12 gap-4 text-sm text-gray-400 mb-2 px-1">
                        <span className="col-span-5">Description</span>
                        <span className="col-span-2">Qty</span>
                        <span className="col-span-2">Rate</span>
                        <span className="col-span-2 text-right">Total</span>
                    </div>
                )}

                
                <div className="space-y-3">
                    {lineItems.map((item, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-12 gap-4 items-center group"
                        >
                            <input
                                autoFocus={index === lineItems.length - 1}
                                placeholder="Item description"
                                className="col-span-5 bg-transparent border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500"
                                value={item.description}
                                onChange={(e) =>
                                    updateItem(index, "description", e.target.value)
                                }
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") addItem();
                                }}
                            />

                            <input
                                type="number"
                                className="col-span-2 bg-transparent border border-gray-700 rounded-lg px-3 py-2"
                                value={item.quantity}
                                onChange={(e) =>
                                    updateItem(index, "quantity", Number(e.target.value))
                                }
                            />

                            <input
                                type="number"
                                className="col-span-2 bg-transparent border border-gray-700 rounded-lg px-3 py-2"
                                value={item.rate}
                                onChange={(e) =>
                                    updateItem(index, "rate", Number(e.target.value))
                                }
                            />

                            <div className="col-span-2 text-right font-medium">
                                ₹{item.total.toFixed(2)}
                            </div>

                            <button
                                onClick={() => removeItem(index)}
                                className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>

                
                <button
                    onClick={addItem}
                    className="mt-4 text-indigo-400 hover:text-indigo-300 text-sm"
                >
                    + Add Item
                </button>

               
                {lineItems.length > 0 && (
                    <div className="mt-10 flex justify-end">
                        <div className="w-80 space-y-3">

                            <div className="flex justify-between text-sm text-gray-400">
                                <span>Subtotal</span>
                                <span>₹{subtotal.toFixed(2)}</span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-400">Tax (%)</span>
                                <input
                                    type="number"
                                    value={taxRate}
                                    onChange={(e) => setTaxRate(Number(e.target.value))}
                                    className="w-20 bg-transparent border border-gray-700 rounded-lg px-3 py-1 text-right"
                                />
                            </div>

                            <div className="flex justify-between text-sm text-gray-400">
                                <span>Tax Amount</span>
                                <span>₹{taxAmount.toFixed(2)}</span>
                            </div>

                            <div className="border-t border-gray-700 pt-3 flex justify-between text-lg font-semibold">
                                <span>Total</span>
                                <span>₹{total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}