import { useState, useEffect } from "react";
import {X} from "lucide-react";
interface LineItem {
    description: string;
    quantity: number;
    rate: number;
    total: number;
}

interface Props {
    initialData?: {
        lineItems: LineItem[];
        taxRate: number;
    };
    onSubmit: (data: {
        lineItems: LineItem[];
        taxRate: number;
    }) => void;
    submitLabel: string;
}

export default function InvoiceForm({
    initialData,
    onSubmit,
    submitLabel,
}: Props) {
    const [lineItems, setLineItems] = useState<LineItem[]>(
        initialData?.lineItems || []
    );

    const [taxRate, setTaxRate] = useState<number>(
        initialData?.taxRate || 0
    );

    useEffect(() => {
        if (initialData) {
            setLineItems(initialData.lineItems);
            setTaxRate(initialData.taxRate);
        }
    }, [initialData]);

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

    return (
        <div>

            <div className="space-y-3">
                {lineItems.map((item, index) => (
                    <div key={index} className="
group

flex flex-col gap-3

rounded-xl
border border-white/10
bg-[#0F172A]
p-4

md:grid md:grid-cols-12
md:items-center
md:gap-4
md:border-0
md:bg-transparent
md:p-0
">

                        <input
                            className="w-full
md:col-span-5 bg-transparent border border-gray-700 rounded-lg px-3 py-2"
                            value={item.description}
                            onChange={(e) =>
                                updateItem(index, "description", e.target.value)
                            }
                        />

                        <input
                            type="number"
                            className="w-full
md:col-span-2 border border-gray-700 rounded-lg px-3 py-2 text-white"
                            value={item.quantity}
                            onChange={(e) =>
                                updateItem(index, "quantity", Number(e.target.value))
                            }
                        />

                        <input
                            type="number"
                            className="w-full
md:col-span-2 border border-gray-700 rounded-lg px-3 py-2 text-white"
                            value={item.rate}
                            onChange={(e) =>
                                updateItem(index, "rate", Number(e.target.value))
                            }
                        />
                        <input
                            type="number"
                            value={taxRate}
                            onChange={(e) => setTaxRate(Number(e.target.value))}
                            className="w-full
md:col-span-2 border border-gray-700 rounded-lg px-3 py-2 text-white"
                        />

                        <div className="flex justify-between
text-sm
md:block
md:col-span-2
md:text-right">
                            <span className="md:hidden text-slate-500">
                                Total
                            </span>

                            <span>
                                ₹{item.total.toFixed(2)}
                            </span>
                        </div>

                        <button
                            onClick={() => removeItem(index)}
                            className="ml-auto  sm:opacity-0 sm:group-hover:opacity-100 text-red-400"
                        >
                            <X size={20} />
                        </button>
                    </div>
                ))}
            </div>

            
            <button onClick={addItem} className="mt-4 text-indigo-400">
                + Add Item
            </button>

           
            <div className="mt-6 text-right space-y-2">
                <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
                <p>Tax: ₹{taxAmount.toFixed(2)}</p>
                <p className="font-semibold">Total: ₹{total.toFixed(2)}</p>
            </div>

           
            <div className="mt-6 flex flex-col sm:flex-row sm:justify-end">
                <button
                    onClick={() => onSubmit({ lineItems, taxRate })}
                    className="w-full sm:w-auto bg-indigo-600 px-6 py-2 rounded-lg"
                >
                    {submitLabel}
                </button>
            </div>
        </div>
    );
}