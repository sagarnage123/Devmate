const User=require("../models/User");
const bcrypt=require("bcryptjs");
const validator=require("validator");
const generateToken=require("../utils/generateToken");

const  registerUser=async (req,res)=>{

    const {name,email,password}=req.body;

    const userExists=await User.findOne({email});

    if(!validator.isEmail(email))
    {
        return res.status(400).json({message:"Please enter the valid email"});
    }

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

const loginUser=async (req,res)=>{

    const {email,password}=req.body;

    const user=await User.findOne({email});

    if(!user)
    {
        return res.status(400).json({message:"This email is not registerd"});
    }

    const isPasswordValid=await bcrypt.compare(password,user.password);

    if(!isPasswordValid)
    {
        return res.status(400).json({message:"Invalid Password"});
    }

    return res.status(200).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        token:generateToken(user._id)
    });

};

module.exports={registerUser,loginUser};