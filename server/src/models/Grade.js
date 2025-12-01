import mongoose from "mongoose";

const gradeSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  course: { type: String, required: true },
  grade: { type: String, required: true },
  year: { type: Number, required: true },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Grade", gradeSchema);
