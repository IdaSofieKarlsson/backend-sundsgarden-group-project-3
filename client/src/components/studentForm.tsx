import { useState } from "react";
import { apiFetch } from "../api/api";
import { auth } from "../firebase";

export default function StudentForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [personNumber, setPersonNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [className, setClassName] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const firebaseUid = auth.currentUser?.uid;

    if (!firebaseUid) {
      setMessage("Error: No authenticated user (admin must be logged in).");
      return;
    }

    try {
      await apiFetch("/api/students", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          address,
          city,
          personNumber,
          phoneNumber,
          class: className,
          firebaseUid,  // *** IMPORTANT ***
        }),
      });

      setMessage("Student registered successfully!");
    } catch (err: any) {
      setMessage(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register Student</h2>

      <label>Name</label>
      <input value={name} onChange={e => setName(e.target.value)} />

      <label>Email</label>
      <input value={email} onChange={e => setEmail(e.target.value)} />

      <label>Address</label>
      <input value={address} onChange={e => setAddress(e.target.value)} />

      <label>City</label>
      <input value={city} onChange={e => setCity(e.target.value)} />

      <label>Personnummer</label>
      <input value={personNumber} onChange={e => setPersonNumber(e.target.value)} />

      <label>Phone</label>
      <input value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />

      <label>Class</label>
      <input value={className} onChange={e => setClassName(e.target.value)} />

      <button type="submit">Register</button>

      {message && <p>{message}</p>}
    </form>
  );
}

/*
import axios from "axios";
import { useState } from "react";

import { apiFetch } from "../api/api";
import { auth } from "../firebase";

//import { Link } from "react-router-dom";
//import { useNavigate } from "react-router-dom";

const StudentForm = () => {
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [personNumber, setPersonNumber] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [className, setClassName] = useState("");
    const [message, setMessage] = useState("");

    //const navigate = useNavigate();   may need if moving after finished wit input data

    const registerStudent = async () => {
        try {
            await axios.post("http://localhost:3001/api/students", { name, email, personNumber, phoneNumber, address });
            alert("student registrerad");
            //navigate("/");  maybe divert after register? 
        } catch (err) {
            console.error("Registrering av student misslyckades: ", err);
        }
    };
    
    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        registerStudent();
    };

    return (
        <div className="container-studentform" >
            <form className="container-form" onSubmit={handleSubmit}>
                <h2>Registrera student</h2>
                <label className="container-label">
                    Namn *{" "}
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Studentens namn"/>
                    Epost *{" "}
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Studentens epost"/>
                    Personnummer *{" "}
                    <input type="text" value={personNumber} onChange={(e) => setPersonNumber(e.target.value)} required placeholder="XXXXXX-XX"/>
                    Telefonnummer *{" "}
                    <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required placeholder="070XXXXXXX"/>
                    Adress *{" "}
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required placeholder="Gata nr 123 45 Ort"/>
                </label>
                <div className="container-button"><button type="submit">Registrera student</button></div>
            </form>        
        </div>
    );
};

export default StudentForm;
*/