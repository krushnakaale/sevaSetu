import { useState } from "react";
import AnalyticsGraph from "../../components/Analytics/AnalyticsGraph";
import { FiBookOpen, FiTrendingUp, FiCheckCircle } from "react-icons/fi";
import StatsCard from "../../components/dashboard/StatsCards";

export default function StudentDashboard({ user }) {
  // -------------------- DATA --------------------
  const [courses] = useState([
    { id: 1, name: "React Basics", progress: 80 },
    { id: 2, name: "Node.js Fundamentals", progress: 50 },
    { id: 3, name: "Python Fundamentals", progress: 100 },
  ]);

  const [activities] = useState([
    { id: 1, activity: "Completed React assignment", date: "2026-01-20" },
    { id: 2, activity: "Submitted Node.js project", date: "2026-01-18" },
    { id: 3, activity: "Joined Python live session", date: "2026-01-15" },
  ]);

  // -------------------- UI STATE --------------------
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showCourses, setShowCourses] = useState(false);
  const [showActivities, setShowActivities] = useState(false);

  // -------------------- DERIVED DATA --------------------
  const overallProgress = Math.round(
    courses.reduce((sum, c) => sum + c.progress, 0) / courses.length,
  );

  const getStatus = (p) =>
    p === 100 ? "Completed" : p >= 60 ? "In Progress" : "Started";

  // -------------------- UI --------------------
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* ================= HEADER ================= */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-2">
          <div>
            {/* Header */}
            <h1 className="text-2xl font-bold mb-1">
              Welcome back, {user?.name || "Student"}
            </h1>

            <p className="text-gray-500 mb-6">
              Track your learning progress and stay consistent.
            </p>
          </div>

          <p className="text text-gray-400">
            {new Date().toLocaleDateString("en-IN", {
              weekday: "long",
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>

        {/* ================= STATS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <StatsCard
            title="Total Courses"
            value={courses.length}
            color="blue"
            icon={FiBookOpen}
            subtitle="Enrolled courses"
          />

          <StatsCard
            title="Overall Progress"
            value={`${overallProgress}%`}
            color="yellow"
            icon={FiTrendingUp}
            subtitle="Average completion"
          />

          <StatsCard
            title="Completed Courses"
            value={courses.filter((c) => c.progress === 100).length}
            color="green"
            icon={FiCheckCircle}
            subtitle="Finished successfully"
          />
        </div>

        {/* ================= CONTROLS ================= */}
        <div className="flex flex-wrap gap-3 mt-6 border-b pb-4">
          <ToggleBtn
            active={showAnalytics}
            onClick={() => setShowAnalytics(!showAnalytics)}
            label="Analytics"
          />
          <ToggleBtn
            active={showCourses}
            onClick={() => setShowCourses(!showCourses)}
            label="My Courses"
          />
          <ToggleBtn
            active={showActivities}
            onClick={() => setShowActivities(!showActivities)}
            label="Recent Activity"
          />
        </div>

        {/* ================= ANALYTICS ================= */}
        {showAnalytics && (
          <Section title="Progress Analytics">
            <AnalyticsGraph courses={courses} />
          </Section>
        )}

        {/* ================= COURSES ================= */}
        {showCourses && (
          <Section title="My Courses">
            {courses.length === 0 ? (
              <Empty text="No courses enrolled yet." />
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-4 py-2 text-left">Course</th>
                      <th className="px-4 py-2 text-left">Progress</th>
                      <th className="px-4 py-2 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((c) => (
                      <tr key={c.id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-2">{c.name}</td>

                        <td className="px-4 py-2">
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className="h-3 bg-yellow-500 rounded-full"
                              style={{ width: `${c.progress}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-500">
                            {c.progress}%
                          </span>
                        </td>

                        <td className="px-4 py-2">
                          <span
                            className={`px-2 py-1 rounded text-xs font-semibold ${
                              c.progress === 100
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {getStatus(c.progress)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Section>
        )}

        {/* ================= ACTIVITIES ================= */}
        {showActivities && (
          <Section title="Recent Activities">
            {activities.length === 0 ? (
              <Empty text="No recent activity." />
            ) : (
              <ul className="space-y-4">
                {activities.map((a) => (
                  <li key={a.id} className="flex gap-3">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2" />
                    <div>
                      <p className="font-medium">{a.activity}</p>
                      <p className="text-xs text-gray-400">{a.date}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Section>
        )}
      </div>
    </div>
  );
}

/* ================= SMALL COMPONENTS ================= */

function ToggleBtn({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md font-medium transition ${
        active ? "bg-yellow-500 text-white" : "bg-white border hover:bg-gray-50"
      }`}
    >
      {active ? `Hide ${label}` : `Show ${label}`}
    </button>
  );
}

function Section({ title, children }) {
  return (
    <div className="mt-6 bg-white p-5 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {children}
    </div>
  );
}

function Empty({ text }) {
  return <p className="text-center text-gray-400 py-6">{text}</p>;
}
