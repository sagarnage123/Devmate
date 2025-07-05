const User=require("../models/User");
const bcrypt=require("bcryptjs");

const  registerUser=async (req,res)=>{

    const {name,email,password}=req.body;

    const userExists=await User.findOne({email});

    if(userExists)
    {
        return res.status(400).json({message:"This email already exists"});
    }

    const hashedPassword=await bcrypt.hash(password,10);

    const newUser=await User.create({name,email,password:hashedPassword});

    if(newUser)
    {
        return res.status(201).json({
            _id:newUser._id,
            name:newUser.name,
            email:newUser.email,
        });
    }
    else{
        return res.status(400).json({message:"Invalid credential"});
    }

};

module.exports={registerUser};