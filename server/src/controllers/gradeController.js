import Grade from "../models/Grade.js";

export async function getStudentGrades(req, res) {
  const grades = await Grade.find({ studentId: req.user.userId });
  res.json(grades);
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
