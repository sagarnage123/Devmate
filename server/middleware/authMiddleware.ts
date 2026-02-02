import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { createError } from "../utils/createError";
import User from "../models/User";

interface JwtPayload {
    id: string;
}

const protect = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        let token: string | undefined;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];

            try {
                const decoded = jwt.verify(
                    token,
                    process.env.JWT_SECRET as string
                ) as JwtPayload;

                const user = await User.findById(decoded.id).select("-password");

                if (!user) {
                    return next(createError("User not found", 404));
                }

                req.user = user;
                next();
            } catch (error: any) {
                console.error("❌ JWT error:", error.message);
                return next(createError("Not authorized, token failed", 401));
            }
        } else {
            return next(createError("Not authorized, no token", 401));
        }
    }
);

export { protect };
    