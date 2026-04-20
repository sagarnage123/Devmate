import PDFDocument from "pdfkit";
import { Response } from "express";

export const generateInvoicePDF = (data: any, res: Response) => {
    const doc = new PDFDocument({ margin: 50 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
        "Content-Disposition",
        `attachment; filename=${data.invoiceNumber}.pdf`
    );

    doc.pipe(res);

   
    doc
        .fontSize(22)
        .font("Helvetica-Bold")
        .text("INVOICE", { align: "right" });

    doc.moveDown(2);

   
    doc
        .fontSize(10)
        .font("Helvetica")
        .text(`Invoice #: ${data.invoiceNumber}`)
        .text(`Issue Date: ${data.issueDate.toDateString()}`)
        .text(`Due Date: ${data.dueDate?.toDateString() || "-"}`);

    doc.moveDown(2);

   
    doc
        .fontSize(12)
        .font("Helvetica-Bold")
        .text("Bill To:");

    doc
        .font("Helvetica")
        .text(data.client.name)
        .text(data.client.email || "");

    doc.moveDown(2);

   
    const tableTop = doc.y;

    doc
        .font("Helvetica-Bold")
        .text("Description", 50, tableTop)
        .text("Qty", 300, tableTop)
        .text("Rate", 350, tableTop)
        .text("Total", 450, tableTop);

    doc.moveDown();

    
    doc
        .moveTo(50, doc.y)
        .lineTo(550, doc.y)
        .stroke();

    doc.moveDown();

    
    doc.font("Helvetica");

    data.lineItems.forEach((item: any) => {
        const y = doc.y;

        doc
            .text(item.description, 50, y)
            .text(item.quantity.toString(), 300, y)
            .text(`INR ${item.rate.toFixed(2)}`, 350, y)
            .text(`INR ${item.total.toFixed(2)}`, 450, y);

        doc.moveDown();
    });

    doc.moveDown();

   
    const rightX = 350;

    doc
        .font("Helvetica")
        .text("Subtotal:", rightX, doc.y, { continued: true })
        .text(`INR ${data.subtotal.toFixed(2)}`, {
            align: "right",
        });

    doc
        .text("Tax:", rightX, doc.y, { continued: true })
        .text(`INR ${data.taxAmount.toFixed(2)}`, {
            align: "right",
        });

    doc
        .font("Helvetica-Bold")
        .text("Total:", rightX, doc.y, { continued: true })
        .text(`INR ${data.total.toFixed(2)}`, {
            align: "right",
        });

    doc.moveDown(2);

    
    doc
        .fontSize(10)
        .fillColor("gray")
        .text("Thank you for your business!", { align: "center" });

    doc.end();
};