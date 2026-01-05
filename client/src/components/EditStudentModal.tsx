import { useState } from "react";
import { apiFetch } from "../api/api";

type Student = {
  _id: string;
  name: string;
  address: string;
  city?: string;
  phoneNumber: string;
  class?: string;
};

interface Props {
  student: Student;
  onClose: () => void;
  onSaved: () => void;
}

export default function EditStudentModal({ student, onClose, onSaved }: Props) {
  const [form, setForm] = useState<Student>({ ...student });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await apiFetch(`/api/students/${student._id}`, {
        method: "PATCH",
        body: JSON.stringify(form),
      });
      onSaved();
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Save failed");
    }
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h3>Edit student</h3>

        <input name="name" value={form.name} onChange={handleChange} />
        <input name="address" value={form.address} onChange={handleChange} />
        <input name="city" value={form.city ?? ""} onChange={handleChange} />
        <input
          name="phoneNumber"
          value={form.phoneNumber}
          onChange={handleChange}
        />
        <input name="class" value={form.class ?? ""} onChange={handleChange} />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.4)",
};

const modalStyle: React.CSSProperties = {
  background: "white",
  padding: 20,
  width: 400,
  margin: "100px auto",
};
