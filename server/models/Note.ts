import mongoose, { Schema, Document, Model } from "mongoose";

export interface INote {
    projectId: mongoose.Types.ObjectId;
    content: string;
}

interface INoteDocument extends INote, Document { }

const noteSchema = new Schema(
    {
        projectId: {
            type: Schema.Types.ObjectId,
            ref: "Project",
            required: true,
        },
        content: {
            type: String,
            required: true,
            trim: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

const Note: Model<INoteDocument> =
    mongoose.models.Note || mongoose.model<INoteDocument>("Note", noteSchema);

export default Note;
