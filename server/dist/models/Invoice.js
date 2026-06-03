"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const invoiceSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    clientId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Client",
        required: true,
    },
    projectId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Project",
    },
    invoiceNumber: {
        type: String,
        required: true,
        trim: true,
    },
    issueDate: {
        type: Date,
        required: true,
    },
    dueDate: {
        type: Date,
    },
    paidAt: {
        type: Date,
    },
    currency: {
        type: String,
        default: "INR",
    },
    lineItems: [
        {
            description: { type: String, required: true, trim: true },
            quantity: { type: Number, required: true, min: 1 },
            rate: { type: Number, required: true, min: 0 },
            total: { type: Number, required: true, min: 0 },
        },
    ],
    subtotal: { type: Number, required: true, min: 0 },
    taxRate: { type: Number, default: 0, min: 0 },
    taxAmount: { type: Number, default: 0, min: 0 },
    total: { type: Number, required: true, min: 0 },
    status: {
        type: String,
        enum: ["draft", "sent", "paid", "overdue"],
        default: "draft",
    },
    notes: { type: String, trim: true },
}, { timestamps: true });
invoiceSchema.index({ clientId: 1, status: 1 });
invoiceSchema.index({ userId: 1, invoiceNumber: 1 }, { unique: true });
const Invoice = mongoose_1.default.models.Invoice ||
    mongoose_1.default.model("Invoice", invoiceSchema);
exports.default = Invoice;
