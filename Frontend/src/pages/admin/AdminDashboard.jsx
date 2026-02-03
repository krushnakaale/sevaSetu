import { useState, useEffect } from "react";
import axiosInstance from "../../api/axios"; // your axios instance with JWT

import StatsCard from "../../components/dashboard/StatsCards";
import UsersTable from "../../components/dashboard/UserTable";
import CoursesTable from "../../components/dashboard/CourseTable";
import ActivityLogs from "../../components/dashboard/ActivityLogs";
import Notifications from "../../components/dashboard/Notifications";
import SearchFilter from "../../components/common/SearchFilter";
import AnalyticsGraph from "../../components/Analytics/AnalyticsGraph";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [logs, setLogs] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [search, setSearch] = useState("");

  // 🔥 ALL SECTIONS HIDDEN BY DEFAULT
  const [showUsers, setShowUsers] = useState(false);
  const [showCourses, setShowCourses] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showLogs, setShowLogs] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // ================= FETCH DATA FROM BACKEND =================
  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch users
        const resUsers = await axiosInstance.get("/admin/users");
        setUsers(resUsers.data);

        // Fetch courses (if your backend has it)
        const resCourses = await axiosInstance.get("/admin/courses");
        setCourses(resCourses.data);

        // Fetch activity logs
        const resLogs = await axiosInstance.get("/admin/logs");
        setLogs(resLogs.data);

        // Fetch notifications
        const resNotifications = await axiosInstance.get(
          "/admin/notifications",
        );
        setNotifications(resNotifications.data);
      } catch (err) {
        console.error("Error fetching admin data:", err);
      }
    }

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    await axiosInstance.delete(`/admin/users/${id}`);
    setUsers(users.filter((u) => u._id !== id));
  };

  const handleBan = async (id) => {
    const res = await axiosInstance.patch(`/admin/users/${id}/status`);

    setUsers(
      users.map((u) => (u._id === id ? { ...u, status: res.data.status } : u)),
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-2">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Admin Dashboard
            </h2>
            <p className="text-sm text-gray-500">
              User management, course control & system monitoring
            </p>
          </div>

          {(showUsers || showCourses) && (
            <div className="w-full md:w-72">
              <SearchFilter
                search={search}
                onSearch={setSearch}
                placeholder="Search users or courses..."
              />
            </div>
          )}
        </header>

        {/* ================= STATS (Always Visible) ================= */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatsCard title="Total Users" value={users.length} color="yellow" />
          <StatsCard
            title="Admins"
            value={users.filter((u) => u.role === "admin").length}
            color="blue"
          />
          <StatsCard
            title="Students"
            value={users.filter((u) => u.role === "student").length}
            color="green"
          />
          <StatsCard
            title="Notifications"
            value={notifications.length}
            color="red"
          />
        </section>

        {/* ================= CONTROLS ================= */}
        <section className="flex flex-wrap gap-3 mt-6 border-b pb-4">
          <ToggleBtn label="Users" onClick={setShowUsers} value={showUsers} />
          <ToggleBtn
            label="Courses"
            onClick={setShowCourses}
            value={showCourses}
          />
          <ToggleBtn
            label="Analytics"
            onClick={setShowAnalytics}
            value={showAnalytics}
          />
          <ToggleBtn label="Logs" onClick={setShowLogs} value={showLogs} />
          <ToggleBtn
            label="Notifications"
            onClick={setShowNotifications}
            value={showNotifications}
          />
        </section>

        {/* ================= USERS ================= */}
        {showUsers && (
          <Section title="User Management">
            <UsersTable
              users={users}
              search={search}
              onBan={handleBan}
              onDelete={handleDelete}
            />
          </Section>
        )}

        {/* ================= COURSES ================= */}
        {showCourses && (
          <Section title="Courses">
            <CoursesTable courses={courses} search={search} />
          </Section>
        )}

        {/* ================= ANALYTICS ================= */}
        {showAnalytics && (
          <Section title="Analytics">
            <AnalyticsGraph users={users} courses={courses} />
          </Section>
        )}

        {/* ================= LOGS ================= */}
        {showLogs && (
          <Section title="Activity Logs">
            <ActivityLogs logs={logs} />
          </Section>
        )}

        {/* ================= NOTIFICATIONS ================= */}
        {showNotifications && (
          <Section title="Notifications">
            <Notifications notifications={notifications} />
          </Section>
        )}
      </div>
    </div>
  );
}

/* ================= REUSABLE COMPONENTS ================= */
function ToggleBtn({ label, onClick, value }) {
  return (
    <button
      onClick={() => onClick(!value)}
      className={`px-4 py-2 rounded-md text-sm font-medium transition
        ${value ? "bg-gray-900 text-white" : "bg-white border hover:bg-gray-100"}
      `}
    >
      {value ? `Hide ${label}` : `Show ${label}`}
    </button>
  );
}

function Section({ title, children }) {
  return (
    <section className="bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {children}
    </section>
  );
}
