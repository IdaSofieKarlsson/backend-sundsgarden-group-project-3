import mongoose from "mongoose";

const gradeSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  course: { type: String, required: true },
  grade: {
    type: String,
    required: true,
    enum: ["A", "B", "C", "D", "E", "F"],
  },
  year: { type: Number, required: true, min: 1, max: 3 },
  gradedAt: { type: Date, required: true }, // teacher-chosen date
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Grade", gradeSchema);
