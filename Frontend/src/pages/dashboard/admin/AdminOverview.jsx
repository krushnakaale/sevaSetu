import DashboardCard from "../../../components/dashboard/DashboardCard";
import React from 'react';
export default function AdminOverview() {
  return (
    <section className="p-6 bg-white">
      <h1 className="text-2xl font-semibold mb-6">Admin Dashboard</h1>

      <div className="grid md:grid-cols-4 gap-4">
        <DashboardCard title="Total Users" value="1,240" />
        <DashboardCard title="Doctors" value="86" />
        <DashboardCard title="Pharmacies" value="42" />
        <DashboardCard title="Orders Today" value="132" />
      </div>
    </section>
  );
}
