import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProject {
    userId: mongoose.Types.ObjectId;
    clientId: mongoose.Types.ObjectId;
    title: string;
    description?: string;
    status: "planned" | "in-progress" | "completed" | "on-hold";
    startDate?: Date;
    dueDate?: Date;
    budget?: number;
}

interface IProjectDocument extends IProject, Document { }

const projectSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        clientId: {
            type: Schema.Types.ObjectId,
            ref: "Client",
            required: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        status: {
            type: String,
            enum: ["planned", "in-progress", "completed", "on-hold"],
            default: "planned",
        },
        startDate: {
            type: Date,
        },
        dueDate: {
            type: Date,
        },
        budget: {
            type: Number,
        },
    },
    { timestamps: true }
);

// indexes (storage-level concern, unchanged)
projectSchema.index({ userId: 1, status: 1 });
projectSchema.index({ clientId: 1 });

const Project: Model<IProjectDocument> =
    mongoose.models.Project ||
    mongoose.model<IProjectDocument>("Project", projectSchema);

export default Project;
