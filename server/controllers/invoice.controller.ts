import { Request, Response } from "express";
import { createInvoiceService, duplicateInvoiceService, getInvoiceByIdService, sendInvoiceService, updateDraftInvoiceService ,markInvoicePaidService, getInvoiceForPDFService} from "./invoice.service";
import { validateCreateInvoice } from "../validations/invoice.validation";
import { getInvoicesService } from "./invoice.service";
import { InvoiceParams, InvoiceQuery } from "../types/invoice.types";
import { generateInvoicePDF } from "../utils/invoice.pdf";

export const createInvoice = async (req: Request, res: Response) => {
    try {
        const userId = req.user!._id;
        console.log("Received invoice creation request with body:At backend", req.body);
        validateCreateInvoice(req.body);
        const invoice = await createInvoiceService(userId, req.body);
        // console.log("Created invoice:", invoice);
        res.status(201).json({
            success: true,
            data: invoice,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const getInvoices = async (
    req: Request<{}, {}, {}, InvoiceQuery>,
    res: Response
) => {
    try {
        const userId = req.user!._id;

        const result = await getInvoicesService(userId, req.query);

        res.status(200).json({
            success: true,
            ...result,
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const getInvoiceById = async (
    req: Request<InvoiceParams>,
    res: Response
) => {
    try {
        const userId = req.user!._id;

        const invoice = await getInvoiceByIdService(userId, req.params.id);

        res.status(200).json({
            success: true,
            data: invoice,
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            const message = error.message;

            if (message === "Invoice not found") {
                return res.status(404).json({
                    success: false,
                    message,
                });
            }

            return res.status(400).json({
                success: false,
                message,
            });
        }

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const duplicateInvoice = async (req: Request, res: Response) => {
    try {
        const userId = req.user!._id;
        const invoiceId = req.params.id;    
        if(!invoiceId || typeof invoiceId !== "string"){
            return res.status(400).json({
                success: false,
                message: "Invoice ID is required",
            });
         }
        const invoice = await duplicateInvoiceService(userId, invoiceId);

        res.status(201).json({
            success: true,
            data: invoice,
        });

    

    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const updateDraftInvoice = async (req: Request, res: Response) => {
    try {
        const userId = req.user!._id;

        const invoice = await updateDraftInvoiceService(
            userId,
            req.params.id as string,
            req.body
        );

        res.status(200).json({
            success: true,
            data: invoice,
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
export const sendInvoice = async (req: Request, res: Response) => {
    try {
        const userId = req.user!._id;

        const invoice = await sendInvoiceService(userId, req.params.id as string);

        res.status(200).json({
            success: true,
            data: invoice,
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const markInvoicePaid = async (req: Request, res: Response) => {
    try {
        const userId = req.user!._id;

        const invoice = await markInvoicePaidService(
            userId,
            req.params.id as string
        );

        res.status(200).json({
            success: true,
            data: invoice,
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const downloadInvoicePDF = async (
    req: Request,
    res: Response
) => {
    try {
        const userId = req.user!._id;

        const data = await getInvoiceForPDFService(
            userId,
            req.params.id as string
        );

        generateInvoicePDF(data, res);
    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};