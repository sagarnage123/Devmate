import { Request, Response, NextFunction } from "express";
import Client from "../models/Client";

import Project from "../models/Project";
import{asyncHandler} from"../utils/asyncHandler";
import {createError} from "../utils/createError";

interface createProjectPayload {
    clientId: string;
    budget?: number;
    dueDate?: Date;
    startDate?: Date;
    description?: string;
    status?: string;
    title: string;
}

const createProject=asyncHandler(async (req: Request<{}, {}, createProjectPayload>,
    res: Response, next: NextFunction)=>{

    const {clientId,budget,dueDate,startDate,description,status,title}=req.body;

    if(!req.user)
        return next(createError("Unauthorized",401));

    if(!clientId)
        return next(createError("Client Id is required",400));

    const client=await Client.findOne({_id:clientId,userId:req.user._id});

    if(!client)
        return next(createError("Client not found",404));

    const newProject=await Project.create({
        userId:req.user._id,
        clientId,
        status,
        startDate,
        dueDate,
        budget,
        description,
        title
    });

    res.status(201).json({
        success:true,
        data:newProject
    });

});

const getProject=asyncHandler(async (req: Request<{}, {}, {}, {clientId?: string, status?: string}>,
    res: Response, next: NextFunction) => {
    const {clientId,status}=req.query;

    if(!req.user)
        return next(createError("Unauthorized",401));


    const filter:Record<string, any>={userId:req.user._id};

    if(clientId)
        filter.clientId=clientId;

    if(status)
        filter.status=status;

    const projects=await Project.find(filter);

    res.status(200).json({projects});
});
interface updateProjectPayload {
    title?: string;
    description?: string;
    status?: string;
    startDate?: Date;
    dueDate?: Date;
    budget?: number;
}

const updateProject = asyncHandler(
    async (
        req: Request<{ id: string }, {}, updateProjectPayload>,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const { id } = req.params;

        if (!req.user) {
            next(createError("Unauthorized", 401));
            return;
        }

        const allowedUpdates = [
            "title",
            "description",
            "status",
            "startDate",
            "dueDate",
            "budget",
        ] as const;

        type AllowedUpdateKey = typeof allowedUpdates[number];

        const updates: Partial<Record<AllowedUpdateKey, updateProjectPayload[AllowedUpdateKey]>> = {};


        for (const key of allowedUpdates) {
            if (req.body[key] !== undefined) {
                updates[key] = req.body[key];
            }
        }

        const updatedProject = await Project.findOneAndUpdate(
            { _id: id, userId: req.user._id },
            updates,
            { new: true, runValidators: true }
        );

        if (!updatedProject) {
            next(createError("No Project found", 404));
            return;
        }

        res.status(200).json({
            success: true,
            data: updatedProject,
        });
    }
);

const deleteProject=asyncHandler(async (req:Request<{id:string}>,res:Response,next:NextFunction)=>{
    const {id}=req.params;

    if(!req.user)
        return next(createError("Unauthorized",401));

    const deletedProject=await Project.findOneAndDelete({_id:id,userId:req.user._id});

    if (!deletedProject) {
        return next(createError("Project not found", 404));
    }

    res.status(200).json({
        message:"Project deleted succesfully",
        success:true
    });
})

export {
    createProject,
    getProject, 
    updateProject,
    deleteProject
};