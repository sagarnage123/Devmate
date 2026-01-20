import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import validator from "validator";

import User,{IUserDocument} from "../models/User";
import { generateToken } from "../utils/generateToken";
import { createError } from "../utils/createError";
import { asyncHandler } from "../utils/asyncHandler";


interface RegisterUserBody {
    name: string;
    email: string;
    password: string;
}

export const registerUser = asyncHandler(
    async (
        req: Request<{}, {}, RegisterUserBody>,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const { name, email, password } = req.body;

        if (!validator.isEmail(email)) {
            return next(createError("Please enter the valid email", 400));
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return next(createError("Email already exists", 400));
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser: IUserDocument = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            _id: newUser._id.toString(),
            name: newUser.name,
            email: newUser.email,
            token: generateToken(newUser._id.toString()),
        });
    }
);



interface LoginUserBody {
    email: string;
    password: string;
}

export const loginUser = asyncHandler(
    async (
        req: Request<{}, {}, LoginUserBody>,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return next(createError("This email is not register", 400));
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return next(createError("Invalid Password", 400));
        }

        res.status(200).json({
            _id: user._id.toString(),
            name: user.name,
            email: user.email,
            token: generateToken(user._id.toString()),
        });
    }
);

interface UpdateUserBody {
    email?: string;
    name?: string;
    password?: string;
}

export const updateUser = asyncHandler(
    async (
        req: Request<{}, {}, UpdateUserBody>,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const { email, name, password } = req.body;

        if (email && !validator.isEmail(email)) {
            return next(createError("Please enter the valid email", 400));
        }

        if (!req.user) {
            return next(createError("User is Not found", 401));
        }

        const user = await User.findById(req.user._id);
        if (!user) {
            return next(createError("User Not found", 404));
        }

        if (email && email !== user.email) {
            const curUser = await User.findOne({ email });

            if (curUser && !curUser._id.equals(user._id)) {
                return next(
                    createError("This email is laready registered", 409)
                );
            }

            user.email = email;
        }

        if (name) user.name = name;
        if (password) user.password = await bcrypt.hash(password, 10);

        await user.save();

        res.status(200).json({
            id: user._id.toString(),
            name: user.name,
            email: user.email,
        });
    }
);


export const getUserProfile = asyncHandler(
    async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        if (!req.user) {
            return next(createError("User not found", 401));
        }

        res.status(200).json({
            id: req.user._id.toString(),
            name: req.user.name,
            email: req.user.email,
        });
    }
);

export const getCurrentUser = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
        res.status(200).json({ user: req.user });
    }
);
