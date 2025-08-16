const Client=require("../models/Client");
const Project=require("../models/Project");
const { asyncHandler } = require("../utils/asyncHandler");
const {createError}=require("../utils/createError");

const createProject=asyncHandler(async (req,res,next)=>{

    const {clientId,budget,dueDate,startDate,description,status,title}=req.body;

    if(!req.user)
        return next(createError("Unothorized",401));

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

module.exports={createProject};