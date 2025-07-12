const User = require("../models/User");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const {generateToken} = require("../utils/generateToken");
const { createError } = require("../utils/createError.js");
const { asyncHandler } = require("../utils/asyncHandler.js");

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

module.exports = { registerUser, loginUser };