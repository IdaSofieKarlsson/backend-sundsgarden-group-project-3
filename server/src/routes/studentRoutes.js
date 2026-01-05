import express from "express";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
import upload from "../middleware/uploadCsv.js";

import {
    getAllStudents,
    registerStudent,
    getStudentByID, 
    getMyStudentProfile, 
    importStudentsCsv,
    updateStudent
} from "../controllers/studentController.js";

const router = express.Router();
// Define routes here

// ADMIN ONLY
router.get("/:id", requireAuth, requireAdmin, getStudentByID);
router.post("/", requireAuth, requireAdmin, registerStudent);
router.get("/", requireAuth, requireAdmin, getAllStudents);
router.patch("/:id", requireAuth, requireAdmin, updateStudent);

router.post(
  "/import-csv",
  requireAuth,
  requireAdmin,
  upload.single("file"),
  importStudentsCsv
);

// STUDENT PROFILE (LOGGED-IN USER)
router.get("/me", requireAuth, getMyStudentProfile);

export default router;
