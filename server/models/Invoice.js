const mongoose=require("mongoose");

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
            ref: "Project"
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

module.exports=mongoose.model("Invoice",invoiceSchema);