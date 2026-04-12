import PDFDocument from "pdfkit";
import { Response } from "express";

interface InvoicePDFData {
    invoiceNumber: string;
    issueDate: Date;
    dueDate?: Date;

    client: {
        name: string;
        email?: string;
    };

    lineItems: {
        description: string;
        quantity: number;
        rate: number;
        total: number;
    }[];

    subtotal: number;
    taxAmount: number;
    total: number;

    notes?: string;
}

export const generateInvoicePDF = (
    data: InvoicePDFData,
    res: Response
) => {
    const doc = new PDFDocument({ margin: 50 });

    
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
        "Content-Disposition",
        `attachment; filename=invoice-${data.invoiceNumber}.pdf`
    );

    doc.pipe(res);

    
    doc
        .fontSize(20)
        .text("INVOICE", { align: "right" });

    doc.moveDown();

    doc
        .fontSize(12)
        .text(`Invoice #: ${data.invoiceNumber}`)
        .text(`Issue Date: ${data.issueDate.toDateString()}`)
        .text(`Due Date: ${data.dueDate?.toDateString() || "-"}`);

    doc.moveDown();

   
    doc
        .fontSize(14)
        .text("Bill To:", { underline: true });

    doc
        .fontSize(12)
        .text(data.client.name)
        .text(data.client.email || "");

    doc.moveDown();

  
    doc
        .fontSize(12)
        .text("Description", 50, doc.y, { continued: true })
        .text("Qty", 250, doc.y, { continued: true })
        .text("Rate", 300, doc.y, { continued: true })
        .text("Total", 400);

    doc.moveDown();

   
    data.lineItems.forEach((item) => {
        doc
            .text(item.description, 50, doc.y, { continued: true })
            .text(item.quantity.toString(), 250, doc.y, { continued: true })
            .text(item.rate.toFixed(2), 300, doc.y, { continued: true })
            .text(item.total.toFixed(2), 400);

        doc.moveDown();
    });

    doc.moveDown();

    
    doc.text(`Subtotal: ₹${data.subtotal.toFixed(2)}`, {
        align: "right",
    });

    doc.text(`Tax: ₹${data.taxAmount.toFixed(2)}`, {
        align: "right",
    });

    doc
        .fontSize(14)
        .text(`Total: ₹${data.total.toFixed(2)}`, {
            align: "right",
        });

    doc.moveDown();

    
    if (data.notes) {
        doc
            .fontSize(12)
            .text("Notes:", { underline: true })
            .text(data.notes);
    }

    doc.end();
};