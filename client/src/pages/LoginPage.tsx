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
      navigate("/admin/students", { replace: true });
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
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit" disabled={loading}>
        Login
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
