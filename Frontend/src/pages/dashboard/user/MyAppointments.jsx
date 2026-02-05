import React from "react";

export default function MyAppointments() {
  return (
    <section className="p-6 bg-white">
      <h2 className="text-xl font-semibold mb-4">My Appointments</h2>

      <div className="border border-gray-300 p-4">
        <p>
          <strong>Doctor:</strong> Dr. Sharma
        </p>
        <p>
          <strong>Date:</strong> 15 Jan 2026
        </p>
        <p>
          <strong>Mode:</strong> Video Consultation
        </p>
      </div>
    </section>
  );
}
