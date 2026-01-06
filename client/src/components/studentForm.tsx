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
    } catch (err: unknown) {
  if (err instanceof Error) {
    setMessage(err.message);
  } else {
    setMessage("Something went wrong");
  }
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
