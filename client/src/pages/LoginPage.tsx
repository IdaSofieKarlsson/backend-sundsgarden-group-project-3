import { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { user, role, loading } = useAuth();

  // Redirect after login based on role
  useEffect(() => {
    if (loading) return;
    if (!user) return;

    if (role === "admin") {
      navigate("/admin", { replace: true });
    } else if (role === "student") {
      navigate("/student/grades", { replace: true });
    } else {
      // If role hasn't been set yet (rare), keep user on login page
      // You can also choose to show a message here if you want
    }
  }, [user, role, loading, navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect happens via the useEffect above (once role is available)
    } catch {
      setError("Invalid email or password");
    }
  }

  return (
    <div style={pageStyle}>
      <form onSubmit={handleSubmit} style={cardStyle}>
        <h2 style={{ marginTop: 0, textAlign: "center" }}>Välkommen till Furets Gymnasie</h2>

        <label style={labelStyle}>Din epost-adress</label>
        <input
          style={inputStyle}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label style={labelStyle}>Ditt lösenord</label>
        <input
          style={inputStyle}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button style={buttonStyle} type="submit" disabled={loading}>
          Login
        </button>

        {error && <p style={{ color: "#b00020" }}>{error}</p>}
      </form>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  marginTop: 12,
  marginBottom: 6,
  fontWeight: 600,
};

const pageStyle: React.CSSProperties = {
  minHeight: "100vh",
  display: "grid",
  placeItems: "center",
  background: "#f2f2f2",
};

const cardStyle: React.CSSProperties = {
  width: 360,
  background: "#fff",
  padding: 20,
  border: "1px solid #ddd",
  borderRadius: 8,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  padding: 12,
  borderRadius: 6,
  border: "1px solid #aaa",
  background: "#f2f2f2",
};

const buttonStyle: React.CSSProperties = {
  width: "100%",
  marginTop: 16,
  padding: 10,
  background: "#666",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
};
