import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { apiFetch } from "../api/api";

type StudentMe = { name: string };

export default function Header() {
  const navigate = useNavigate();
  const { user, role } = useAuth();
  const [displayName, setDisplayName] = useState<string>("");

  useEffect(() => {
    const load = async () => {
      if (!user) {
        setDisplayName("");
        return;
      }

      if (role === "admin") {
        setDisplayName("Astrid Wallin");
        return;
      }

      // student
      try {
        const me = await apiFetch<StudentMe>("/api/students/me");
        setDisplayName(me.name);
      } catch {
        setDisplayName("");
      }
    };

    load();
  }, [user, role]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/", { replace: true });
  };

  if (!user) return null;

  return (
  <header style={headerOuter}>
    <div style={headerInner}>
      <div style={{ fontWeight: 700 }}>
        {role === "admin" ? "Admin" : "Grades"}
      </div>

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <div>{displayName || "User"}</div>
        <button style={logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  </header>
);
}

const headerOuter: React.CSSProperties = {
  //background: "#d9d9d9",
  borderBottom: "1px solid #bdbdbd",
};

const headerInner: React.CSSProperties = {
  maxWidth: 1100,
  margin: "0 auto",
  padding: "10px 16px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};
/*
const headerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 16px",
  background: "#d9d9d9",
  borderBottom: "1px solid #bdbdbd",
};
*/
const logoutBtn: React.CSSProperties = {
  padding: "6px 10px",
  background: "#777",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
};
