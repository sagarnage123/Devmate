import Counter from "../models/counter.model";
import mongoose, { Types } from "mongoose";

export const generateInvoiceNumber = async (
    userId: Types.ObjectId
): Promise<string> => {
    const year = new Date().getFullYear();

    const counter = await Counter.findOneAndUpdate(
        { userId: new mongoose.Types.ObjectId(userId), year },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );

    const padded = String(counter.seq).padStart(3, "0");

    return `INV-${year}-${padded}`;
};