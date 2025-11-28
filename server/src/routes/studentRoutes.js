import express from "express";

import {
    getAllStudents,
    registerStudent,
    getStudentByID
} from "../controllers/studentController.js";

const router = express.Router();
// Define routes here
router.get("/", getAllStudents);
router.get("/:id", getStudentByID);
router.post("/", registerStudent);

export default router;
