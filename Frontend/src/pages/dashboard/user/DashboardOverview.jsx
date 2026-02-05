import { useEffect, useState } from "react";
import DashboardCard from "../../../components/dashboard/DashboardCard";
import { Calendar, ShoppingBag, HeartPulse, AlertTriangle } from "lucide-react";
import axios from "../../../api/axios";

export default function DashboardOverview() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const res = await axios.get("/user/dashboard");
        setData(res.data.data);
      } catch (err) {
        console.error("Dashboard error", err);

        // 🔹 fallback sample
        setData({
          stats: {
            totalAppointments: 3,
            totalOrders: 12,
            pendingOrders: 1,
          },
          healthRecord: {
            vitals: {
              bloodPressure: { systolic: 120, diastolic: 80, unit: "mmHg" },
              bloodSugar: { value: 98, unit: "mg/dL" },
              bmi: { value: 22.4 },
              heartRate: { value: 72, unit: "bpm" },
            },
          },
          recentAppointments: [
            {
              _id: 1,
              doctor: { user: { name: "Dr. Rahul Patil" } },
              appointmentDate: "2026-02-12",
            },
            {
              _id: 2,
              doctor: { user: { name: "Dr. Neha Sharma" } },
              appointmentDate: "2026-02-05",
            },
          ],
          recentOrders: [
            {
              _id: 1,
              pharmacy: { pharmacyName: "Apollo Pharmacy" },
              orderStatus: "delivered",
            },
            {
              _id: 2,
              pharmacy: { pharmacyName: "MedPlus" },
              orderStatus: "pending",
            },
          ],
        });
      }
    };

    loadDashboard();
  }, []);

  if (!data) return null;

  const vitals = data.healthRecord?.vitals || {};

  return (
    <section className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Welcome back 👋
        </h1>
        <p className="text-sm text-gray-600">
          Here’s a snapshot of your health & activity
        </p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <DashboardCard
          title="Appointments"
          value={data.stats.totalAppointments}
          icon={<Calendar size={22} />}
        />
        <DashboardCard
          title="Orders"
          value={data.stats.totalOrders}
          icon={<ShoppingBag size={22} />}
        />
        <DashboardCard
          title="Active Prescriptions"
          value="2"
          icon={<HeartPulse size={22} />}
        />
        <DashboardCard
          title="Health Alerts"
          value={data.stats.pendingOrders}
          icon={<AlertTriangle size={22} />}
          highlight
        />
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Health Summary */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold mb-4">Health Summary</h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <HealthStat
              label="Blood Pressure"
              value={
                vitals.bloodPressure
                  ? `${vitals.bloodPressure.systolic} / ${vitals.bloodPressure.diastolic} ${vitals.bloodPressure.unit}`
                  : "—"
              }
            />
            <HealthStat
              label="Blood Sugar"
              value={
                vitals.bloodSugar
                  ? `${vitals.bloodSugar.value} ${vitals.bloodSugar.unit}`
                  : "—"
              }
            />
            <HealthStat label="BMI" value={vitals.bmi?.value ?? "—"} />
            <HealthStat
              label="Heart Rate"
              value={
                vitals.heartRate
                  ? `${vitals.heartRate.value} ${vitals.heartRate.unit}`
                  : "—"
              }
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold mb-4">Quick Actions</h2>

          <ul className="space-y-3 text-sm">
            <QuickAction text="Book Doctor Appointment" />
            <QuickAction text="Order Medicines" />
            <QuickAction text="Update Health Vitals" />
            <QuickAction text="Emergency SOS" danger />
          </ul>
        </div>
      </div>

      {/* Activity */}
      <div className="grid lg:grid-cols-2 gap-6 mt-6">
        <ActivityCard title="Recent Appointments">
          {data.recentAppointments.map((a) => (
            <ActivityItem
              key={a._id}
              left={a.doctor.user.name}
              right={new Date(a.appointmentDate).toDateString()}
            />
          ))}
        </ActivityCard>

        <ActivityCard title="Recent Orders">
          {data.recentOrders.map((o) => (
            <ActivityItem
              key={o._id}
              left={o.pharmacy.pharmacyName}
              right={o.orderStatus}
              status
            />
          ))}
        </ActivityCard>
      </div>
    </section>
  );
}

/* --- helpers (unchanged UI) --- */

function HealthStat({ label, value }) {
  return (
    <div className="border rounded-lg p-3">
      <p className="text-gray-500">{label}</p>
      <p className="font-medium text-gray-900">{value}</p>
    </div>
  );
}

function QuickAction({ text, danger }) {
  return (
    <li
      className={`p-3 rounded-lg cursor-pointer border transition ${
        danger
          ? "border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
          : "border-gray-200 hover:bg-gray-50"
      }`}
    >
      {text}
    </li>
  );
}

function ActivityCard({ title, children }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="font-semibold mb-4">{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function ActivityItem({ left, right, status }) {
  return (
    <div className="flex justify-between text-sm border-b pb-2">
      <span>{left}</span>
      <span
        className={
          status
            ? right === "pending"
              ? "text-yellow-600"
              : "text-green-600"
            : "text-gray-500"
        }
      >
        {right}
      </span>
    </div>
  );
}
