import express from "express";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

import {
    getAllStudents,
    registerStudent,
    getStudentByID
} from "../controllers/studentController.js";

const router = express.Router();
// Define routes here

router.get("/:id", requireAuth, requireAdmin, getStudentByID);
router.post("/", requireAuth, requireAdmin, registerStudent);
router.get("/", requireAuth, requireAdmin, getAllStudents);

export default router;
