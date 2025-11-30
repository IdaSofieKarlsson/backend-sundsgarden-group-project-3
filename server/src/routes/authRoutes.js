import express from "express";
import { login } from "../controllers/authController.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";  //behövs denna? 

const router = express.Router();

router.post("/login", login);

export default router;
