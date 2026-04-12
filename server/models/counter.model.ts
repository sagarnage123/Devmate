import mongoose, { Schema, Document, Model } from "mongoose";

interface ICounter extends Document {
    userId: mongoose.Types.ObjectId;
    year: number;
    seq: number;
}

const counterSchema = new Schema<ICounter>({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    year: { type: Number, required: true },
    seq: { type: Number, default: 0 },
});

counterSchema.index({ userId: 1, year: 1 }, { unique: true });

const Counter: Model<ICounter> =
    mongoose.models.Counter ||
    mongoose.model<ICounter>("Counter", counterSchema);

export default Counter;