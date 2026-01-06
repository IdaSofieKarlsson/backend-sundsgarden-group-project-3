import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "../api/api";

type Grade = {
  _id: string;
  course: string;     // "Svenska 1"
  grade: string;      // A-F
  year: number;       // 1-3
  gradedAt: string;   // ISO string
};

const SUBJECTS = [
  "Alla",
  "Engelska",
  "Historia",
  "Idrott och hälsa",
  "Matematik",
  "Naturkunskap",
  "Religionskunskap",
  "Samhällskunskap",
  "Svenska",
];

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

type Row = {
  course: string;
  grade?: string;
  gradedAt?: string;
};

export default function StudentGrades() {
  const [year, setYear] = useState<number | "all">("all");
  const [subject, setSubject] = useState<string>("Alla");
  const [grades, setGrades] = useState<Grade[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      setError("");
      try {
        const url =
          year === "all" ? "/api/grades/me" : `/api/grades/me?year=${year}`;
        const data = await apiFetch<Grade[]>(url);
        setGrades(data);
      } catch (err: unknown) {
        setGrades([]);
        setError(err instanceof Error ? err.message : "Failed to load grades");
      }
    };
    load();
  }, [year]);

  const rows: Row[] = useMemo(() => {
    // Build the course list to display (even when grades are missing)
    const yearsToShow: (1 | 2 | 3)[] =
      year === "all" ? [1, 2, 3] : [year as 1 | 2 | 3];

    let courses = yearsToShow.flatMap((y) => COURSES_BY_YEAR[y]);

    if (subject !== "Alla") {
      courses = courses.filter((c) => c.startsWith(subject + " "));
    }

    // Map existing grades by course
    const gradeMap = new Map<string, Grade>();
    for (const g of grades) {
      gradeMap.set(g.course, g);
    }

    // Merge: always show course; add grade if exists
    const merged = courses.map((c) => {
      const g = gradeMap.get(c);
      return {
        course: c,
        grade: g?.grade,
        gradedAt: g?.gradedAt,
      };
    });

    // Alphabetical sort (Swedish collation)
    return merged.sort((a, b) => a.course.localeCompare(b.course, "sv"));
  }, [grades, subject, year]);

  return (
    <div style={wrap}>
      <h2 style={{ marginTop: 0 }}>Översikt Betyg</h2>

      <div style={controls}>
        <div style={btnRow}>
          <button style={btn(year === "all")} onClick={() => setYear("all")}>
            Alla
          </button>
          <button style={btn(year === 1)} onClick={() => setYear(1)}>
            Läsår 1
          </button>
          <button style={btn(year === 2)} onClick={() => setYear(2)}>
            Läsår 2
          </button>
          <button style={btn(year === 3)} onClick={() => setYear(3)}>
            Läsår 3
          </button>
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <label style={{ minWidth: 50 }}>Ämne</label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            style={selectStyle}
          >
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && <p style={{ color: "#b00020" }}>{error}</p>}

      <table style={table}>
        <thead>
          <tr>
            <th style={th}>Kurs</th>
            <th style={th}>Betyg</th>
            <th style={th}>Datum</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.course}>
              <td style={td}>{r.course}</td>
              <td style={td}>{r.grade ?? ""}</td>
              <td style={td}>{r.gradedAt ? formatDateYYYYMMDD(r.gradedAt) : ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function formatDateYYYYMMDD(d: string) {
  return d?.slice(0, 10) || "";
}

const wrap: React.CSSProperties = {
  maxWidth: 900,
  margin: "24px auto",
  padding: 16,
  background: "#fff",
  border: "1px solid #ddd",
  borderRadius: 8,
};

const controls: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 16,
  flexWrap: "wrap",
  marginBottom: 12,
  alignItems: "center",
};

const btnRow: React.CSSProperties = { display: "flex", gap: 8 };

const btn = (active: boolean): React.CSSProperties => ({
  padding: "8px 10px",
  borderRadius: 6,
  border: "1px solid #aaa",
  background: active ? "#999" : "#e6e6e6",
  color: active ? "#fff" : "#000",
  cursor: "pointer",
});

const selectStyle: React.CSSProperties = {
  padding: 8,
  borderRadius: 6,
  border: "1px solid #aaa",
  background: "#f2f2f2",
};

const table: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  background: "#f7f7f7",
  border: "1px solid #ccc",
};

const th: React.CSSProperties = {
  textAlign: "left",
  padding: 10,
  borderBottom: "1px solid #ccc",
  background: "#e0e0e0",
};

const td: React.CSSProperties = {
  padding: 10,
  borderBottom: "1px solid #ddd",
};
