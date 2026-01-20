import mongoose,{Schema,Model,Document} from "mongoose";

interface IInvoiceLineItem {
    description: string
    quantity: number
    rate: number
    total: number
}


export interface IInvoice {
    userId: mongoose.Types.ObjectId;    
    clientId: mongoose.Types.ObjectId;
    projectId: mongoose.Types.ObjectId;
    invoiceNumber: string;
    issueDate: Date;
    dueDate?: Date;
    lineItems: IInvoiceLineItem[];
    subtotal: number;
    tax?: number;
    total: number;
    status: "draft" | "sent" | "paid" | "overdue";
    notes?: string;
}

interface IInvoiceDocument extends IInvoice, Document {}

const invoiceSchema=new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        clientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Client",
            required: true
        },
        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            required:true
        },
        invoiceNumber: {
            type: String,
            required: true,
            trim: true
        },
        issueDate: {
            type: Date,
            required: true
        },
        dueDate: {
            type: Date
        },
        lineItems: [
            {
                description: { type: String, required: true, trim: true },
                quantity: { type: Number, required: true, min: 1 },
                rate: { type: Number, required: true, min: 0 },
                total: { type: Number, required: true, min: 0 }
            }
        ],
        subtotal: {
            type: Number,
            required: true,
            min: 0
        },
        tax: {
            type: Number,
            default: 0,
            min: 0
        },
        total: {
            type: Number,
            required: true,
            min: 0
        },
        status: {
            type: String,
            enum: ["draft", "sent", "paid", "overdue"],
            default: "draft"
        },
        notes: {
            type: String,
            trim: true
        }
    },
    {timestamps:true}
);

invoiceSchema.index({clientId:1,status:1});
invoiceSchema.index({userId:1,invoiceNumber:1},{unique:true});

const Invoice: Model<IInvoiceDocument> =
 mongoose.models.Invoice || mongoose.model<IInvoiceDocument>("Invoice", invoiceSchema);
export default Invoice