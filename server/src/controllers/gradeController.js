import { z } from "zod";
import Grade from "../models/Grade.js";
import Student from "../models/studentModel.js";

function isValidISODateString(s) {
  // Must be YYYY-MM-DD and a real date (reject 2026-02-30)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const d = new Date(s + "T00:00:00Z");
  if (Number.isNaN(d.getTime())) return false;
  // Ensure roundtrip preserves the date
  const [y, m, day] = s.split("-").map(Number);
  return d.getUTCFullYear() === y && d.getUTCMonth() + 1 === m && d.getUTCDate() === day;
}

const COURSES_BY_YEAR = {
  1: [
    "Engelska 1",
    "Historia 1",
    "Idrott och hälsa 1",
    "Matematik 1",
    "Naturkunskap 1",
    "Religionskunskap 1",
    "Samhällskunskap 1",
    "Svenska 1",
  ],
  2: [
    "Engelska 2",
    "Historia 2",
    "Idrott och hälsa 2",
    "Matematik 2",
    "Naturkunskap 2",
    "Religionskunskap 2",
    "Samhällskunskap 2",
    "Svenska 2",
  ],
  3: [
    "Engelska 3",
    "Historia 3",
    "Idrott och hälsa 3",
    "Matematik 3",
    "Naturkunskap 3",
    "Religionskunskap 3",
    "Samhällskunskap 3",
    "Svenska 3",
  ],
};

export async function getStudentGrades(req, res) {
  try {
    const year = req.query.year ? Number(req.query.year) : null;

    const student = await Student.findOne({ firebaseUid: req.user.uid });
    if (!student) return res.status(404).json({ error: "Student not found" });

    const query = { studentId: student._id };
    if (year) query.year = year;

    const grades = await Grade.find(query);
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
  try {
    const schema = z.object({
      studentId: z.string().min(1),
      year: z.number().int().min(1).max(3),
      course: z.string().min(1),
      grade: z.enum(["A", "B", "C", "D", "E", "F"]),
      gradedAt: z.string().refine(isValidISODateString, "Invalid date (YYYY-MM-DD)"),
    });

    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten() });
    }

    const { studentId, year, course, grade, gradedAt } = parsed.data;

    // Enforce predefined courses for that year
    if (!COURSES_BY_YEAR[year].includes(course)) {
      return res.status(400).json({ error: `Course not allowed for year ${year}` });
    }

    const updated = await Grade.findOneAndUpdate(
      { studentId, course, year },
      { grade, gradedAt: new Date(gradedAt), updatedAt: Date.now() },
      { upsert: true, new: true }
    );

    res.json(updated);
  } catch (err) {
    console.error("adminCreateOrUpdate error:", err);
    res.status(500).json({ error: "Server error" });
  }
}
