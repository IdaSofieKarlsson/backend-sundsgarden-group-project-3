import Grade from "../models/Grade.js";
import Student from "../models/studentModel.js";

export async function getStudentGrades(req, res) {
  try {
    const firebaseUid = req.user.uid;

    const student = await Student.findOne({ firebaseUid });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    const grades = await Grade.find({ studentId: student._id });
    res.json(grades);

  } catch (err) {
    console.error("getStudentGrades error:", err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function adminGetGrades(req, res) {
  const grades = await Grade.find().populate("studentId", "name email");
  res.json(grades);
}

export async function adminCreateOrUpdate(req, res) {
  const { studentId, course, grade, year } = req.body;

  const updated = await Grade.findOneAndUpdate(
    { studentId, course, year },
    { grade, updatedAt: Date.now() },
    { upsert: true, new: true }
  );

  res.json(updated);
}
