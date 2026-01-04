import { app } from "./app.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



/*
import admin from "./src/firebase.js"; // MUST be loaded before routes
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import studentRouter from "./src/routes/studentRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import gradeRoutes from "./src/routes/gradeRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173", // the frontend URL, Vite default
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // set to false if not using cookies/auth headers
  })
);
//ska det vara bara "/grades" alltså inget /api/ ? 
app.use("/api/students", studentRouter);
app.use("/api/auth", authRoutes);
app.use("/api/grades", gradeRoutes);

mongoose
.connect(process.env.MONGO_URI)
.then(() => console.log("We are connected to MongoDB!"))
.catch((err) => console.error("Failed to connect to MongoDB", err));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
*/