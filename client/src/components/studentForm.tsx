import axios from "axios";
import { useState } from "react";
//import { Link } from "react-router-dom";
//import { useNavigate } from "react-router-dom";

const StudentForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [personNumber, setPersonNumber] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    
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