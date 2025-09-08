const Client=require("../models/Client");
const validator=require("validator");
const {createError}=require("../utils/createError");
const {asyncHandler}=require("../utils/asyncHandler");

const createClient= asyncHandler(async (req,res,next)=>{

    const {name,email,phone,address}=req.body;

    if(email && !validator.isEmail(email))
        return next(createError("Please enter the valid email",400));

    if(!req.user)
        return next(createError("Unothorized",401));

    if(email)
    {
        const doesEmailExists=await Client.findOne({email,userId:req.user._id});

        if(doesEmailExists)
            return next(createError("This email is already registerd",409));

    }
    // console.log('Create clinet called');
    

    const newClient=await Client.create({
        userId:req.user._id,
        name,
        email,
        phone,
        address
    });

    return res.status(201).json({
        success: true,
        data:newClient
    });

}); 

module.exports={createClient};