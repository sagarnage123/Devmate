import mongoose,{Document,Model,Schema} from "mongoose";

export interface ITask {
    userId: mongoose.Types.ObjectId;    
    projectId: mongoose.Types.ObjectId;
    title: string;
    description?: string;   
    status: "todo" | "in-progress" | "done";
    priority: "Low" | "Medium" | "High";
    dueDate?: Date;
    completedAt?: Date;
}
interface ITaskDocument extends ITask, Document {}
const taskSchema=new Schema(
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
            enum: ["Low", "Medium", "High"],
            default: "Medium"
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

const Task: Model<ITaskDocument> =
 mongoose.models.Task || mongoose.model<ITaskDocument>("Task", taskSchema);

export default Task;