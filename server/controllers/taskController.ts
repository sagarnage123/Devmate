import { Request, Response, NextFunction } from "express";
import Task from "../models/Task";
import Project from "../models/Project";
import {asyncHandler} from"../utils/asyncHandler";
import {createError} from "../utils/createError";
import { mongo, Types } from "mongoose";

interface createTaskPayload {
    projectId: string;
    title: string;
    description?: string;
    status?: string;
    priority?: string;
    dueDate?: Date;
}
const createTask=asyncHandler(async (req: Request<{}, {}, createTaskPayload>,
    res:Response,next:NextFunction)=>{
    if(!req.user)
        return next(createError("Unauthorized",401));

    const { projectId, title, description, status, priority, dueDate }=req.body;

    if(!projectId)
        return next(createError("Project required for creating task",400));

    if(!title)
        return next(createError("Title is required for the task",400));

    const project=await Project.findOne({_id:projectId,userId:req.user._id});
   
    
    if(!project)
        return next(createError("Project not found",404));

    const newTask=await Task.create({
        userId:req.user._id,
        projectId,
        title,
        priority,
        status,
        dueDate,
        description
    });

    res.status(201).json({ succes:true,data:newTask});
});

interface updateTaskPayload {
    title?: string;
    description?: string;
    status?: string;
    priority?: string;
    dueDate?: Date;
    completedAt?: Date | null;
}

const updateTask=asyncHandler(async (req: Request<{id:string}, {}, updateTaskPayload>,
    res:Response,next:NextFunction)=>{
    if(!req.user)
        return next(createError("Unautorized",401));

    const {id}=req.params;
    if(!id)
        return next(createError("Not found",404));

    const allowedUpdates = ["title", "description", "status", "priority", "dueDate", "completedAt"] as const;

    type allowedKey=typeof allowedUpdates[number];

    const updates: Partial<Record<allowedKey,updateTaskPayload[allowedKey]>>={};

    for(const key of allowedUpdates)
    {
        if(req.body[key]!==undefined)
            updates[key]=req.body[key];
        
    }
    const task=await Task.findOneAndUpdate({_id:id,userId:req.user._id},
        updates,
        {new:true,runValidators:true}
    );

    if (!task) return next(createError("Task not found", 404));

    res.status(200).json({succes:true,data:task});
})
interface TaskFilter {
    userId: Types.ObjectId;
    projectId?: string;
    status?: string;
    priority?: string;
}

const getTask=asyncHandler(async (req:Request<{}, {}, {}, {projectId?: string, status?: string, priority?: string}>,
    res:Response,next:NextFunction)=>{
    if(!req.user)
        return next(createError("Unathorized",401));

    const {projectId,status,priority}=req.query;

    const filter:TaskFilter={userId:req.user._id};

    if(projectId)
        filter.projectId=projectId;

    if(priority)
        filter.priority=priority;
    if(status)
        filter.status=status;

    const tasks=await Task.find(filter).sort({dueDate:1});

    res.status(200).json({succes:true,data:tasks});
});

const deleteTask=asyncHandler(async (req:Request<{id:string}, {}, {}, {}>,
    res:Response,next:NextFunction)=>{
    if(!req.user)
        return next(createError("Unauthorized",401));

    const {id}=req.params;

    if(!id)
        return next(createError("No task found",404));

    const task = await Task.findOneAndDelete({ _id: id, userId: req.user._id });

    if(!task)
        return next(createError("Task not found",404));

    res.status(200).json({succes:true,message:"Task deleted succesfuly"})
});

export {
    createTask,
    updateTask,
    getTask,
    deleteTask
};
