import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongodb/connect.js";
import register from "./routes/register.js";
import login from "./routes/login.js";
import profileRoutes from "./routes/profileRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import dashboard from "./routes/dashboard.js";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

// Use register and login routes for user authentication
app.use("/api/users", register);
app.use("/api/users", login);

// Use profile, course, and user routes
app.use("/api/users", profileRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/users", userRoutes);
app.use("/api/dashboard",dashboard);

const startServer = async () => {
    try {
        await connectDB(process.env.MONGODB_URL);
        app.listen(8080, () =>
            console.log("Server started on port http://localhost:8080"),
        );
    } catch (error) {
        console.log(error);
    }
};

startServer();
