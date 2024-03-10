import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongodb/connect.js";
import register from "./routes/register.js";
import login from "./routes/login.js";
import profileRoutes from "./routes/profileRoutes.js"

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/users", register);

app.use("/api/users", login);

app.use('/api/users', profileRoutes);

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
