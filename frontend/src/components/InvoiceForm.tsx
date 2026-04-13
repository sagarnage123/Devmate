import { useState, useEffect } from "react";

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
                    <div key={index} className="grid grid-cols-12 gap-4 items-center group">

                        <input
                            className="col-span-5 bg-transparent border border-gray-700 rounded-lg px-3 py-2"
                            value={item.description}
                            onChange={(e) =>
                                updateItem(index, "description", e.target.value)
                            }
                        />

                        <input
                            type="number"
                            className="col-span-2 border border-gray-700 rounded-lg px-3 py-2"
                            value={item.quantity}
                            onChange={(e) =>
                                updateItem(index, "quantity", Number(e.target.value))
                            }
                        />

                        <input
                            type="number"
                            className="col-span-2 border border-gray-700 rounded-lg px-3 py-2"
                            value={item.rate}
                            onChange={(e) =>
                                updateItem(index, "rate", Number(e.target.value))
                            }
                        />

                        <div className="col-span-2 text-right">
                            ₹{item.total.toFixed(2)}
                        </div>

                        <button
                            onClick={() => removeItem(index)}
                            className="opacity-0 group-hover:opacity-100 text-red-400"
                        >
                            ✕
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

           
            <div className="mt-6 flex justify-end">
                <button
                    onClick={() => onSubmit({ lineItems, taxRate })}
                    className="bg-indigo-600 px-6 py-2 rounded-lg"
                >
                    {submitLabel}
                </button>
            </div>
        </div>
    );
}