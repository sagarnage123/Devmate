interface LineItemInput {
    description: string;
    quantity: number;
    rate: number;
}

interface ComputedLineItem extends LineItemInput {
    total: number;
}

export const calculateInvoiceTotals = (
    lineItems: LineItemInput[],
    taxRate: number
) => {
    const computedItems: ComputedLineItem[] = lineItems.map((item) => {
        const total = item.quantity * item.rate;
        return { ...item, total };
    });

    const subtotal = computedItems.reduce((sum, item) => sum + item.total, 0);

    const taxAmount = (subtotal * taxRate) / 100;

    const total = subtotal + taxAmount;

    return {
        lineItems: computedItems,
        subtotal,
        taxAmount,
        total,
    };
};