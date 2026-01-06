import { useNavigate } from "react-router-dom";

export default function AdminHome() {
  const navigate = useNavigate();

  return (
    <div style={wrap}>
      <h2 style={{ marginTop: 0 }}>Admin</h2>

      <div style={grid}>
        <button style={tile} onClick={() => navigate("/admin/grades")}>
          Registrera Betyg
        </button>

        <button style={tile} onClick={() => navigate("/admin/students")}>
          Administrera Student Information
        </button>
      </div>
    </div>
  );
}

const wrap: React.CSSProperties = {
  maxWidth: 700,
  margin: "24px auto",
  padding: 16,
  background: "#fff",
  border: "1px solid #ddd",
  borderRadius: 8,
};

const grid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 16,
};

const tile: React.CSSProperties = {
  padding: 24,
  background: "#e6e6e6",
  border: "1px solid #bbb",
  borderRadius: 8,
  cursor: "pointer",
  fontSize: 16,
};
