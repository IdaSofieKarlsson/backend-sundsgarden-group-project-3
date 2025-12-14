import { useState, useEffect } from "react";
import { apiFetch } from "../api/api";

type Student = {
  _id: string;
  name: string;
  address: string;
  personNumber: string;
  phoneNumber: string;
  email: string;
};

const StudentList = () => {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await apiFetch<Student[]>("/api/students");
        setStudents(data);
      } catch (err: unknown) {
        console.error("Failed to fetch students:", err);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div>
      <h2>Addresses</h2>
      <table>
        <thead>
          <tr>
            <th>Student</th>
            <th>Email</th>
            <th>Personnr</th>
            <th>Tel.</th>
            <th>Adress</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
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