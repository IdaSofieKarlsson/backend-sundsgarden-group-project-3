import bcrypt from "bcryptjs";
import User from "../models/User.js";
import admin from "firebase-admin";

export async function login(req, res) {
  const { email, password } = req.body;

  // Check the local DB (MongoDB)
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: "User not found" });

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) return res.status(401).json({ error: "Invalid password" });

  // Firebase token generation (recommended for rubric)
  const token = await admin.auth().createCustomToken(user._id.toString());

  res.json({
    token,
    role: user.role,
    name: user.name,
  });
}
