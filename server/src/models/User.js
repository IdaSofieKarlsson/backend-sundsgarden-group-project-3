import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["student", "admin"], default: "student" },
  name: String,
  personnr: String,
  phone: String,
  address: String
});

export default mongoose.model("User", userSchema);
