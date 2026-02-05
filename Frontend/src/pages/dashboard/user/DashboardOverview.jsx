import DashboardCard from "../../../components/dashboard/DashboardCard";
import React from "react";
export default function DashboardOverview() {
  return (
    <section className="p-6 bg-white">
      <h1 className="text-2xl font-semibold mb-6">Dashboard Overview</h1>

      <div className="grid md:grid-cols-4 gap-4">
        <DashboardCard title="Total Orders" value="12" />
        <DashboardCard title="Appointments" value="3" />
        <DashboardCard title="Active Prescriptions" value="2" />
        <DashboardCard title="Health Alerts" value="1" />
      </div>
    </section>
  );
}
