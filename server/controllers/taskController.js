const Task=require("../models/Task");
const Project=require("../models/Project");
const {asyncHandler}=require("../utils/asyncHandler");
const {createError}=require("../utils/createError");
const { findOneAndUpdate } = require("../models/Client");

const createTask=asyncHandler(async (req,res,next)=>{
    if(!req.user)
        return next(createError("Unauthorized",401));

    const { projectId, title, description, status, priority, dueDate }=req.body;

    if(!projectId)
        return next(createError("Project required for creating task",400));

    if(!title)
        return next(createError("Title is required for the task"),400);

    const project=await Project.findOne({_id:projectId,userId:req.user._id});
    console.log(title);
    
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

const updateTask=asyncHandler(async (req,res,next)=>{
    if(!req.user)
        return next(createError("Unautorized",401));

    const {id}=req.params;
    if(!id)
        return next(createError("Not found",404));

    const allowedUpdates = ["title", "description", "status", "priority", "dueDate", "completedAt"];

    const updates={}

    for(key of allowedUpdates)
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

const getTask=asyncHandler(async (req,res,next)=>{
    if(!req.user)
        return next(createError("Unathorized",401));

    const {projectId,status,priority}=req.query;

    const filter={userId:req.user._id};

    if(projectId)
        filter.projectId=projectId;

    if(priority)
        filter.priority=priority;
    if(status)
        filter.status=status;

    const tasks=await Task.find(filter).sort({dueDate:1});

    res.status(200).json({succes:true,data:tasks});
});

const deleteTask=asyncHandler(async (req,res,next)=>{
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

module.exports={createTask,updateTask,deleteTask,getTask};
