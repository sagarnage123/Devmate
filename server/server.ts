import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();

import userRoutes from "./routes/userRoutes";
import noteRoutes from "./routes/noteRoutes";
import tagRoutes from "./routes/tagRoutes";
import clientRoutes from "./routes/clientRoutes";
import projectRoutes from "./routes/projectRoute";
import taskRoutes from "./routes/taskRoutes";

import { errorHandler } from "./middleware/errorMiddleware";

const allowedOrigins: string[] = [
    "http://localhost:5173",
    "http://localhost:5174",
];

app.use(
    cors({
        origin: function (
            origin: string | undefined,
            callback: (err: Error | null, allow?: boolean) => void
        ) {
            if (!origin) return callback(null, true);

            if (allowedOrigins.includes(origin))
                return callback(null, true);

            return callback(new Error("Not allowed by CORS"));
        },
        credentials: true,
    })
);

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/tags", tagRoutes);
app.use("/api/client", clientRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/task", taskRoutes);

app.get("/", (req: Request, res: Response) => {
    res.send("Hello");
});

app.get("/api/test", (req: Request, res: Response) => {
    res.json({ message: "Hey hello from devmate" });
});

app.use(errorHandler);

const PORT = Number(process.env.PORT) || 5000;

mongoose
    .connect(process.env.MONGO_URI as string)
    .then(() => {
        console.log("✅ MongoDB connected");
    })
    .catch((e) => {
        console.log("❌ MongoDB connection failed:", e);
    });

app.listen(PORT, (err?: Error) => {
    if (err) {
        console.log("Error found while setting up the server", err);
    } else {
        console.log(`Server is running at the PORT ${PORT}`);
    }
});
