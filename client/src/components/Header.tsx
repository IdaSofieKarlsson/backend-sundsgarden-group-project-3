import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const navigate = useNavigate();
  const { user, role } = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login", { replace: true });
  };

  return (
    <header style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: 12 }}>
      <div>
        {user ? (
          <span>
            Logged in as: {user.email} {role ? `(${role})` : ""}
          </span>
        ) : (
          <span>Not logged in</span>
        )}
      </div>

      {user && <button onClick={handleLogout}>Logout</button>}
    </header>
  );
}
