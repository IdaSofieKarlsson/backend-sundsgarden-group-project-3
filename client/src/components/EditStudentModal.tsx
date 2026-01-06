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
        <label style={labelStyle}>Namn</label>
        <input style={inputStyle} name="name" value={form.name} onChange={handleChange} />
        <label style={labelStyle}>Gatuadress</label>
        <input style={inputStyle} name="address" value={form.address} onChange={handleChange} />
        <label style={labelStyle}>Postnummer, Postort</label>
        <input style={inputStyle} name="city" value={form.city ?? ""} onChange={handleChange} />
        <label style={labelStyle}>Telefonnummer</label>
        <input style={inputStyle} name="phoneNumber" value={form.phoneNumber} onChange={handleChange} />
        <label style={labelStyle}>Klass</label>
        <input style={inputStyle} name="class" value={form.class ?? ""} onChange={handleChange} />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 14 }}>
        <button style={btnSecondary} onClick={onClose}>Cancel</button>
        <button style={btnPrimary} onClick={handleSave}>Save</button>
      </div>

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
  display: "grid",
  placeItems: "center",
  padding: 16,
};

const modalStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: 520,
  background: "#fff",
  border: "1px solid #ddd",
  borderRadius: 8,
  padding: 16,
};
/*
const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: 10,
  borderRadius: 6,
  border: "1px solid #aaa",
  background: "#f2f2f2",
  marginBottom: 10,
};
*/
const labelStyle: React.CSSProperties = {
  display: "block",
  fontWeight: 600,
  marginBottom: 6,
  marginTop: 10,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  padding: 12,
  borderRadius: 6,
  border: "1px solid #aaa",
  background: "#f2f2f2",
};

const btnPrimary: React.CSSProperties = {
  height: 40,
  padding: "0 14px",
  borderRadius: 6,
  border: "1px solid #666",
  background: "#777",
  color: "#fff",
  cursor: "pointer",
};

const btnSecondary: React.CSSProperties = {
  height: 40,
  padding: "0 14px",
  borderRadius: 6,
  border: "1px solid #aaa",
  background: "#e6e6e6",
  cursor: "pointer",
};
