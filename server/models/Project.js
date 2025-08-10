const mongoose=require("mongoose");

const projectSchema=new mongoose.Schema(
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
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            trim: true
        },
        status: {
            type: String,
            enum: ["planned", "in-progress", "completed", "on-hold"],
            default: "planned"
        },
        startDate: {
            type: Date
        },
        dueDate: {
            type: Date
        },
        budget: {
            type: Number 
        }

    },
    {timestamps:true}
)

projectSchema.index({userId:1,status:1});
projectSchema.index({clientId:1});
module.exports=mongoose.model("Project",projectSchema);