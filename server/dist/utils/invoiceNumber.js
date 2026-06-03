"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateInvoiceNumber = void 0;
const counter_model_1 = __importDefault(require("../models/counter.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const generateInvoiceNumber = async (userId) => {
    const year = new Date().getFullYear();
    const counter = await counter_model_1.default.findOneAndUpdate({ userId: new mongoose_1.default.Types.ObjectId(userId), year }, { $inc: { seq: 1 } }, { new: true, upsert: true });
    const padded = String(counter.seq).padStart(3, "0");
    return `INV-${year}-${padded}`;
};
exports.generateInvoiceNumber = generateInvoiceNumber;
