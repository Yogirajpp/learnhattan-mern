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
import achivementsRoutes from "./routes/achivementsRoutes.js";
import rankingRoutes from "./routes/rankingRoutes.js";
import assignmentsRoutes from "./routes/assignmentRoutes.js";
import markContributorRouter from "./routes/markContributorRoutes.js"; // Import the router

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
app.use("/api/achivements",achivementsRoutes);


app.use("/api/assignments", assignmentsRoutes);

// Mount the router at the desired endpoint
app.use("/api/users", markContributorRouter);

//Ranking System
app.use("/api/ranking",rankingRoutes);

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
