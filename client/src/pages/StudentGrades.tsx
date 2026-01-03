import { useEffect, useState } from "react";
import { apiFetch } from "../api/api";

type Grade = {
  _id: string;
  course: string;
  grade: string;
  year: number;
};

export default function StudentGrades() {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await apiFetch<Grade[]>("/api/grades/me");
        setGrades(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to load grades");
      }
    };

    load();
  }, []);

  return (
    <div>
      <h2>My Grades</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <table>
        <thead>
          <tr>
            <th>Course</th>
            <th>Grade</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((g) => (
            <tr key={g._id}>
              <td>{g.course}</td>
              <td>{g.grade}</td>
              <td>{g.year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
