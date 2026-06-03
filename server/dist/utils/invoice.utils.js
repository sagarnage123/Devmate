"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateInvoiceTotals = void 0;
const calculateInvoiceTotals = (lineItems, taxRate) => {
    const computedItems = lineItems.map((item) => {
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
exports.calculateInvoiceTotals = calculateInvoiceTotals;
