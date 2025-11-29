import express from "express";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
import { getStudentGrades, adminGetGrades, adminCreateOrUpdate } from "../controllers/gradeController.js";

const router = express.Router();

router.get("/me", requireAuth, getStudentGrades);          // student
router.get("/", requireAuth, requireAdmin, adminGetGrades); // admin
router.post("/", requireAuth, requireAdmin, adminCreateOrUpdate);

export default router;
