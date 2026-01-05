import { useState, useEffect } from "react";
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
    <div>
      <h2>Addresses</h2>

      <div style={{ marginBottom: 12 }}>
        <label>
          Import CSV:{" "}
          <input type="file" accept=".csv" onChange={handleImportCsv} />
        </label>
        {importMsg && <p>{importMsg}</p>}
      </div>

      <table>
        <thead>
          <tr>
            <th>Student</th>
            <th>E-post</th>
            <th>Person-nr</th>
            <th>Telefon-nr</th>
            <th>Gatuadress</th>
            <th>Postnummer, Postort</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id} onClick={() => setSelectedStudent(student)} style={{ cursor: "pointer" }}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.personNumber}</td>
              <td>{student.phoneNumber}</td>
              <td>{student.address}</td>
              <td>{student.city ?? ""}</td>
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
  );
};

export default StudentList;





/*
import { useState, useEffect } from "react";
import axios from "axios";

type Student = {
    _id: string,
    name: string,
    address: string,
    personNumber: string,
    phoneNumber: string,
    email: string
};


const StudentList = () => {

    const [students, setStudents] = useState<Student[]>([]);

    const fetchStudents = async () => {
        try {
            const respons = await axios.get("http://localhost:3001/api/students");
            setStudents(respons.data);
        } catch (err) {
            console.error("Failed to fetch students: ", err);
            
        }
    };
    /* not needed?
    const deleteStudent = async (id: string) => {
        try {
            await axios.delete(`http://localhost:5000/students/${id}`);
        } catch (err) {
            console.error("Failed to delete student: ", err);
            
        }
    };*/
/*
    useEffect(() => {
        fetchStudents();
    },[]);

    return (
        <div>
            <h2>Addresses</h2>
            <table>
                <thead>
                    <tr><th>Student</th><th>Email</th><th>Personnr</th><th>Tel.</th><th>Adress</th></tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                    <tr key={student._id} >
                        <td>{student.name}</td>
                        <td>{student.email}</td>
                        <td>{student.personNumber}</td>
                        <td>{student.phoneNumber}</td>
                        <td>{student.address}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

};

export default StudentList; */