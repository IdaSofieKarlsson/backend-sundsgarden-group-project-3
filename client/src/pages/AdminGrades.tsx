import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../api/api";

type Student = {
  _id: string;
  name: string;
  class?: string;
};

const GRADES = ["A", "B", "C", "D", "E", "F"] as const;

const COURSES_BY_YEAR: Record<1 | 2 | 3, string[]> = {
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

export default function AdminGrades() {
  const navigate = useNavigate();

  const [students, setStudents] = useState<Student[]>([]);
  const [studentId, setStudentId] = useState("");
  const [year, setYear] = useState<1 | 2 | 3>(1);
  const [course, setCourse] = useState(COURSES_BY_YEAR[1][0]);
  const [grade, setGrade] = useState<(typeof GRADES)[number]>("A");
  const [gradedAt, setGradedAt] = useState(todayYYYYMMDD());
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const data = await apiFetch<Student[]>("/api/students");
        // alphabetical by name
        data.sort((a, b) => a.name.localeCompare(b.name, "sv"));
        setStudents(data);
        if (data.length > 0) setStudentId(data[0]._id);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to load students");
      }
    };
    loadStudents();
  }, []);

  // When year changes, update course to the first course for that year
  useEffect(() => {
    setCourse(COURSES_BY_YEAR[year][0]);
  }, [year]);

  const courses = useMemo(() => {
    return [...COURSES_BY_YEAR[year]].sort((a, b) => a.localeCompare(b, "sv"));
  }, [year]);

  const handleSave = async () => {
    setMessage("");
    setError("");

    if (!studentId) {
      setError("Select a student.");
      return;
    }

    if (!isValidISODate(gradedAt)) {
      setError("Invalid date. Use YYYY-MM-DD and a real calendar date.");
      return;
    }

    try {
      await apiFetch("/api/grades", {
        method: "POST",
        body: JSON.stringify({
          studentId,
          year,
          course,
          grade,
          gradedAt,
        }),
      });

      setMessage("Saved.");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Save failed");
    }
  };

  return (
    <div style={page}>
      <div style={panel}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
          <h2 style={{ margin: 0 }}>Registrera Betyg</h2>

          <button style={btnSecondary} onClick={() => navigate("/admin")}>
            Tillbaka
          </button>
        </div>

        <div style={formGrid}>
          <div>
            <label style={label}>Student</label>
            <select
              style={select}
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            >
              {students.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={label}>Läsår</label>
            <select
              style={select}
              value={year}
              onChange={(e) => setYear(Number(e.target.value) as 1 | 2 | 3)}
            >
              <option value={1}>Läsår 1</option>
              <option value={2}>Läsår 2</option>
              <option value={3}>Läsår 3</option>
            </select>
          </div>

          <div>
            <label style={label}>Kurs</label>
            <select
              style={select}
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            >
              {courses.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={label}>Betyg</label>
            <select
              style={select}
              value={grade}
              onChange={(e) => setGrade(e.target.value as (typeof GRADES)[number])}
            >
              {GRADES.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={label}>Datum (ÅÅÅÅ-MM-DD)</label>
            <input
              style={input}
              value={gradedAt}
              onChange={(e) => setGradedAt(e.target.value)}
              placeholder="2026-01-05"
            />
          </div>

          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <button style={btnPrimary} onClick={handleSave}>
              Spara Betyg
            </button>
          </div>
        </div>

        {message && <p style={{ color: "#2f6f2f", marginTop: 12 }}>{message}</p>}
        {error && <p style={{ color: "#b00020", marginTop: 12 }}>{error}</p>}
      </div>
    </div>
  );
}

function todayYYYYMMDD() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function isValidISODate(s: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const d = new Date(s + "T00:00:00Z");
  if (Number.isNaN(d.getTime())) return false;
  const [y, m, day] = s.split("-").map(Number);
  return d.getUTCFullYear() === y && d.getUTCMonth() + 1 === m && d.getUTCDate() === day;
}

const page: React.CSSProperties = {
  minHeight: "calc(100vh - 52px)", // header height approx
  display: "grid",
  placeItems: "center",
  padding: 16,
};

const panel: React.CSSProperties = {
  width: "100%",
  maxWidth: 900,
  background: "#fff",
  border: "1px solid #ddd",
  borderRadius: 8,
  padding: 16,
};

const formGrid: React.CSSProperties = {
  marginTop: 16,
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 12,
};

const label: React.CSSProperties = {
  display: "block",
  marginBottom: 6,
  fontWeight: 600,
};

const input: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  height: 44,
  padding: "0 10px",
  borderRadius: 6,
  border: "1px solid #aaa",
  background: "#f2f2f2",
};

const select: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  height: 44,
  padding: "0 10px",
  borderRadius: 6,
  border: "1px solid #aaa",
  background: "#f2f2f2",
};

const btnPrimary: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  height: 44,
  padding: "0 10px",
  borderRadius: 6,
  border: "1px solid #666",
  background: "#777",
  color: "#fff",
  cursor: "pointer",
};

const btnSecondary: React.CSSProperties = {
  padding: "8px 10px",
  borderRadius: 6,
  border: "1px solid #aaa",
  background: "#e6e6e6",
  cursor: "pointer",
};
