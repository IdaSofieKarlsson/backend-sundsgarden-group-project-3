import { useEffect, useState } from "react";
import { apiFetch } from "../api/api.js";

export default function StudentGrades() {
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    apiFetch("/api/grades/me")
      .then(data => setGrades(data));
  }, []);

  return (
    <div>
      <h2>My Grades</h2>
      <table>
        <thead>
          <tr>
            <th>Course</th><th>Grade</th><th>Year</th>
          </tr>
        </thead>
        <tbody>
          {grades.map(g => (
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
