import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import studentRouter from "./src/routes/studentRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*", // your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // set to false if not using cookies/auth headers
  })
);

app.use("/api/students", studentRouter);
//app.use("/api/users", userRouter);
//app.use("/api/sessions", sessionRouter);
/*
app.use("/api/games", gameRouter);
app.use("/api/users", userRouter);
app.use("/api/sessions", sessionRouter);
*/

mongoose
.connect(process.env.MONGO_URI)
.then(() => console.log("We are connected to MongoDB!"))
.catch((err) => console.error("Failed to connect to MongoDB", err));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
