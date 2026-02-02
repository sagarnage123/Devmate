import Client from "../models/Client";
import validator from "validator";
import { Request, Response, NextFunction } from "express";
import { createError } from "../utils/createError";
import { asyncHandler } from "../utils/asyncHandler";

interface CreateClientBody {
    name: string;
    email?: string;
    phone?: string;
    address?: string;
}

export const createClient = asyncHandler(
    async (
        req: Request<{}, {}, CreateClientBody>,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const { name, email, phone, address } = req.body;

        if (email && !validator.isEmail(email)) {
            return next(createError("Please enter the valid email", 400));
        }

        if (!req.user) {
            return next(createError("Unauthorized", 401));
        }

        if (email) {
            const doesEmailExists = await Client.findOne({
                email,
                userId: req.user._id,
            });

            if (doesEmailExists) {
                return next(
                    createError("This email is already registered", 409)
                );
            }
        }

        const newClient = await Client.create({
            userId: req.user._id,
            name,
            email,
            phone,
            address,
        });

        res.status(201).json({
            success: true,
            data: {
                id: newClient._id.toString(),
                name: newClient.name,
                email: newClient.email,
                phone: newClient.phone,
                address: newClient.address,
            },
        });
    }
);

export const getClients = asyncHandler(
    async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        if (!req.user) {
            return next(createError("Unauthorized", 401));
        }

        const clients = await Client.find({
            userId: req.user._id,
        });

        res.status(200).json({
            clients: clients.map((client) => ({
                id: client._id.toString(),
                name: client.name,
                email: client.email,
                phone: client.phone,
                address: client.address,
            })),
        });
    }
);
