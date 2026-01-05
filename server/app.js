import admin from "./src/firebase.js"; // MUST be loaded before routes
import express from "express";
import cors from "cors";

// import routers
import studentRouter from "./src/routes/studentRoutes.js";
import gradeRouter from "./src/routes/gradeRoutes.js";

export const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/api/students", studentRouter);
app.use("/api/grades", gradeRouter);
