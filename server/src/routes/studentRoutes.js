import express from "express";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
import upload from "../middleware/uploadCsv.js";

import {
    getAllStudents,
    getMyStudentProfile, 
    registerStudent,
    updateStudent,
    importStudentsCsv,
    getStudentByID 
} from "../controllers/studentController.js";

const router = express.Router();
// Define routes here

// STUDENT PROFILE (LOGGED-IN USER)
router.get("/me", requireAuth, getMyStudentProfile);

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



export default router;
