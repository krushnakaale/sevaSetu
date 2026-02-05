import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/common/ProtectedRoute";

import HomePage from "./pages/home/HomePage";
import ContactPage from "./pages/contact/ContactPage";

// Core Modules
import MedicinesPage from "./pages/medicines/MedicinesPage";
import ConsultPage from "./pages/consult/ConsultPage";
import TrackerPage from "./pages/tracker/TrackerPage";
import EmergencyPage from "./pages/emergency/EmergencyPage";

// User Pages
import ProfilePage from "./pages/profile/ProfilePage";
import Settings from "./pages/settings/Settings";

// Dashboards
import StudentDashboard from "./pages/dashboard/user/DashboardOverview";
import AdminDashboard from "./pages/dashboard/admin/AdminOverview";

// Auth
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";

import { getCurrentUser } from "./api/axios";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      const u = await getCurrentUser();
      setUser(u);
      setLoading(false);
    }
    fetchUser();

    const handleStorage = () => fetchUser();
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar user={loading ? null : user} />

        <main className="flex-grow">
          <Routes>
            {/* 🌐 Public */}
            <Route path="/" element={<HomePage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* 💊 Core Health Features */}
            <Route path="/medicines" element={<MedicinesPage />} />
            <Route path="/consult" element={<ConsultPage />} />
            <Route path="/tracker" element={<TrackerPage />} />
            <Route path="/emergency" element={<EmergencyPage />} />

            {/* 🔐 Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* 👨‍🎓 User Protected */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute user={user} role="user">
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute user={user}>
                  <ProfilePage user={user} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/settings"
              element={
                <ProtectedRoute user={user}>
                  <Settings user={user} setUser={setUser} />
                </ProtectedRoute>
              }
            />

            {/* 👨‍💼 Admin Protected */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute user={user} role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* ❌ 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
