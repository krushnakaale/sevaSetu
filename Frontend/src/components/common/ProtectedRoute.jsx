import { Navigate } from "react-router-dom";
import React from "react";

export default function ProtectedRoute({ user, role, children }) {
  if (user === undefined) return null;

  // ❌ not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ❌ role mismatch
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  // ✅ allowed
  return children;
}
