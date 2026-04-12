export const validateCreateInvoice = (data: any) => {
    if (!data.clientId) throw new Error("Client is required");

    if (!data.lineItems || data.lineItems.length === 0) {
        throw new Error("At least one line item is required");
    }

    data.lineItems.forEach((item: any, index: number) => {
        if (!item.description) {
            throw new Error(`Item ${index + 1}: description required`);
        }
        if (item.quantity <= 0) {
            throw new Error(`Item ${index + 1}: invalid quantity`);
        }
        if (item.rate < 0) {
            throw new Error(`Item ${index + 1}: invalid rate`);
        }
    });
};