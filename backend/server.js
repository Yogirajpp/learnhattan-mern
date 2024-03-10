// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongodb/connect.js";
import userRoutes from "./routes/UserRoutes.js";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

// Use user routes
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.send({ message: "Hello World!" });
});

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
