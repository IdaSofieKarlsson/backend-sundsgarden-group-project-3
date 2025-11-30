import express from "express";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

import {
    getAllStudents,
    registerStudent,
    getStudentByID, 
    getMyStudentProfile
} from "../controllers/studentController.js";

const router = express.Router();
// Define routes here

// ADMIN ONLY
router.get("/:id", requireAuth, requireAdmin, getStudentByID);
router.post("/", requireAuth, requireAdmin, registerStudent);
router.get("/", requireAuth, requireAdmin, getAllStudents);

// STUDENT PROFILE (LOGGED-IN USER)
router.get("/me", requireAuth, getMyStudentProfile);

export default router;
