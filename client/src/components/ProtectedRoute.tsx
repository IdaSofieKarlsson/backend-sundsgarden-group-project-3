import type { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface RouteProps {
  children: ReactElement;
}

export function ProtectedRoute({ children }: RouteProps) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/" replace />;

  return children;
}

export function AdminRoute({ children }: RouteProps) {
  const { user, loading, role } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/" replace />;
  if (role !== "admin") return <Navigate to="/no-access" replace />;

  return children;
}
