"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const noteRoutes_1 = __importDefault(require("./routes/noteRoutes"));
const tagRoutes_1 = __importDefault(require("./routes/tagRoutes"));
const clientRoutes_1 = __importDefault(require("./routes/clientRoutes"));
const projectRoute_1 = __importDefault(require("./routes/projectRoute"));
const taskRoutes_1 = __importDefault(require("./routes/taskRoutes"));
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
];
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.includes(origin))
            return callback(null, true);
        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
}));
app.use(express_1.default.json());
app.use("/api/users", userRoutes_1.default);
app.use("/api/notes", noteRoutes_1.default);
app.use("/api/tags", tagRoutes_1.default);
app.use("/api/client", clientRoutes_1.default);
app.use("/api/project", projectRoute_1.default);
app.use("/api/task", taskRoutes_1.default);
app.get("/", (req, res) => {
    res.send("Hello");
});
app.get("/api/test", (req, res) => {
    res.json({ message: "Hey hello from devmate" });
});
app.use(errorMiddleware_1.errorHandler);
const PORT = Number(process.env.PORT) || 5000;
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => {
    console.log("✅ MongoDB connected");
})
    .catch((e) => {
    console.log("❌ MongoDB connection failed:", e);
});
app.listen(PORT, (err) => {
    if (err) {
        console.log("Error found while setting up the server", err);
    }
    else {
        console.log(`Server is running at the PORT ${PORT}`);
    }
});
