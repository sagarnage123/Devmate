const mongoose=require("mongoose");

const taskSchema=new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
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
            enum: ["todo", "in-progress", "done"],
            default: "todo"
        },
        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "medium"
        },
        dueDate: {
            type: Date
        },
        completedAt: {
            type: Date
        }
    },
    {timestamps:true}
);

taskSchema.index({projectId:1,status:1});
taskSchema.index({userId:1,dueDate:1});

module.exports=mongoose.model("Task",taskSchema);