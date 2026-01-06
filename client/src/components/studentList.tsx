import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../api/api";
import EditStudentModal from "./EditStudentModal";

type Student = {
  _id: string;
  name: string;
  email: string;
  address: string;
  city?: string;
  personNumber: string;
  phoneNumber: string;
};

type ImportResult = {
  message: string;
  created: number;
  updated: number;
  skipped: number;
};

const StudentList = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [importMsg, setImportMsg] = useState<string>("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const navigate = useNavigate();

  const loadStudents = async () => {
    const data = await apiFetch<Student[]>("/api/students");
    setStudents(data);
  };

  useEffect(() => {
    const run = async () => {
      try {
        await loadStudents();
      } catch (err) {
        console.error("Failed to fetch students:", err);
      }
    };
    run();
  }, []);

  const handleImportCsv = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImportMsg("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      // IMPORTANT: for FormData, don't set Content-Type manually
      const result = await apiFetch<ImportResult>("/api/students/import-csv", {
        method: "POST",
        body: formData,
        // apiFetch currently sets Content-Type: application/json.
        // We must allow FormData to set its own boundary.
        // So: we need a tiny change in apiFetch after you paste this.
      });

      setImportMsg(
        `${result.message}. Created: ${result.created}, Updated: ${result.updated}, Skipped: ${result.skipped}`
      );

      // Refresh table after import
      await loadStudents();
    } catch (err: unknown) {
      setImportMsg(err instanceof Error ? err.message : "Import failed");
    } finally {
      e.target.value = "";
    }
  };

  return (
    <div style={page}>
    <div style={panel}>
      <div style={topRow}>
        <h2 style={{ margin: 0 }}>Översikt Studenter</h2>

        <button style={btnSecondary} onClick={() => navigate("/admin")}>
          Tillbaka
        </button>
      </div>

      <div style={{ marginTop: 12, marginBottom: 12 }}>
        <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
          Importera CSV-fil
        </label>
        <input type="file" accept=".csv" onChange={handleImportCsv} />
        {importMsg && <p style={{ marginTop: 8 }}>{importMsg}</p>}
      </div>

      <table style={table}>
        <thead>
          <tr>
            <th style={th}>Student</th>
            <th style={th}>Epost</th>
            <th style={th}>Personnummer</th>
            <th style={th}>Telefonnummer</th>
            <th style={th}>Address</th>
            <th style={th}>Postnummer, Postort</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr
              key={student._id}
              onClick={() => setSelectedStudent(student)}
              style={trClickable}
            >
              <td style={td}>{student.name}</td>
              <td style={td}>{student.email}</td>
              <td style={td}>{student.personNumber}</td>
              <td style={td}>{student.phoneNumber}</td>
              <td style={td}>{student.address}</td>
              <td style={td}>{student.city ?? ""}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedStudent && (
        <EditStudentModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
          onSaved={loadStudents}
        />
      )}
    </div>
  </div>
  );
};

const page: React.CSSProperties = {
  minHeight: "calc(100vh - 52px)",
  display: "grid",
  placeItems: "center",
  padding: 16,
};

const panel: React.CSSProperties = {
  width: "100%",
  maxWidth: 1100,
  background: "#fff",
  border: "1px solid #ddd",
  borderRadius: 8,
  padding: 16,
};

const topRow: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 12,
};

const btnSecondary: React.CSSProperties = {
  padding: "8px 10px",
  borderRadius: 6,
  border: "1px solid #aaa",
  background: "#e6e6e6",
  cursor: "pointer",
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

const trClickable: React.CSSProperties = {
  cursor: "pointer",
};

export default StudentList;
