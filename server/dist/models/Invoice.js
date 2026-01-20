"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const invoiceSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    clientId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Client",
        required: true
    },
    projectId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Project",
        required: true
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
}, { timestamps: true });
invoiceSchema.index({ clientId: 1, status: 1 });
invoiceSchema.index({ userId: 1, invoiceNumber: 1 }, { unique: true });
const Invoice = mongoose_1.default.models.Invoice || mongoose_1.default.model("Invoice", invoiceSchema);
exports.default = Invoice;
