import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/home/HomePage";
import AboutPage from "./pages/about/AboutPage";
import ContactPage from "./pages/contact/ContactPage";
import ProgressPage from "./pages/progress/ProgressPage";
import ProfilePage from "./pages/profile/ProfilePage";
import ServicePage from "./pages/service/ServicePage";
import Settings from "./pages/settings/Settings";

import AdminDashboard from "./pages/admin/AdminDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";

import { getCurrentUser } from "./api/axios"; // axiosInstance / fetch wrapper

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const u = await getCurrentUser(); // GET /auth/me
      setUser(u);
    }
    fetchUser();

    // Listen for localStorage events (login/logout)
    const handleStorage = () => fetchUser();
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Navbar receives user prop */}
        <Navbar user={user} />

        <main className="flex-grow">
          <Routes>
            <Route path="/student" element={<StudentDashboard user={user} />} />
            <Route path="/admin" element={<AdminDashboard user={user} />} />
            <Route
              path="/settings"
              element={<Settings user={user} setUser={setUser} />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/services" element={<ServicePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
