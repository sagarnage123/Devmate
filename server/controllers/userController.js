const User = require("../models/User");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const {generateToken} = require("../utils/generateToken");
const { createError } = require("../utils/createError.js");
const { asyncHandler } = require("../utils/asyncHandler.js");
const { get } = require("mongoose");

const registerUser = asyncHandler(async (req, res, next) => {

    const { name, email, password } = req.body;


    if (!validator.isEmail(email)) {
        return next(createError("Please enter the valid email", 400));
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        return next(createError("Email already exists", 400));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ name, email, password: hashedPassword });

    if (newUser) {
        return res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
        });
    }
    else {
        return next(createError("Invalid Credentials", 400));
    }
});

const loginUser = asyncHandler(async (req, res, next) => {

    console.log("Login");

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return next(createError("This email is not register", 400));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return next(createError("Invalid Password", 400));
    }

    return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
    });


});

const updateUser=asyncHandler(async (req,res,next)=>{

    const {email,name,password}=req.body;

    if(email && !validator.isEmail(email))
    {
        return next(createError("Please enter the valid email",402));
    }

    
    if(!req.user)
        return next(createError("User is Not found",401));
    
    const user=await User.findById(req.user._id);

    const userEmail=user.email;
    if(email && email.toString() !== userEmail.toString())
    {
        const curUser=await User.findOne({email});

        if(curUser && curUser._id !== user._id)
            return next(createError("This email is laready registered",400));

        user.email=email;
        console.log(userEmail,email);
        
    }

    if(!user)
        return next(createError("User Not found",401));

    if(name)
        user.name=name;

    if(password)
        user.password=await bcrypt.hash(password,10);

    await user.save();
    return res.status(200).json({
        id:user._id,
        name:user.name,
        email:user.email,
        pass:user.password
    })


    next();
    
});

const getUserProfile=asyncHandler(async (req,res,next)=>{

    if(!req.user)
        return next(createError('User not found',401));

    return res.status(200).json({
        id:req.user._id,
        name:req.user.name,
        email:req.user.email
    });


}) ;
const getCurrentUser=asyncHandler(async (req,res,next)=>{

    res.status(200).json({user:req.user});
});

module.exports = { registerUser, loginUser , updateUser,getUserProfile ,getCurrentUser};