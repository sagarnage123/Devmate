const Client=require("../models/Client");
const Project=require("../models/Project");
const { asyncHandler } = require("../utils/asyncHandler");
const {createError}=require("../utils/createError");

const createProject=asyncHandler(async (req,res,next)=>{

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

    return res.status(201).json({
        success:true,
        data:newProject
    });

});

const getProject=asyncHandler(async (req,res,next) =>{
    const {clientId,status}=req.query;

    if(!req.user)
        return next(createError("Unauthorized",401));


    const filter={userId:req.user._id};

    if(clientId)
        filter.clientId=clientId;

    if(status)
        filter.status=status;

    const projects=await Project.find(filter);

    res.status(200).json({projects});
});

const updateProject=asyncHandler(async (req,res,next)=>{
    const {id}=req.params;

    
    
    if(!req.user)
        return next(createError("Unauthorized",401));

    // console.log('Update Project called');
    

    const allowedUpdates = ["title", "description", "status", "startDate", "dueDate", "budget"];
    const updates={};

    for(let key of allowedUpdates)
    {
        if(req.body[key]!==undefined)
            updates[key]=req.body[key];
    }

    const updatedProject=await Project.findOneAndUpdate({_id:id,userId:req.user._id},
        updates,
        {new:true,runValidators:true}
    );
    
    
    if(!updatedProject)
        return next(createError("No Project found",404));

    

    return res.status(200).json({ success: true, data: updatedProject });
});

const deleteProject=asyncHandler(async (req,res,next)=>{
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

module.exports={createProject,getProject,updateProject,deleteProject};