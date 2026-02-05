import React from "react";

export default function HealthSummary() {
  return (
    <section className="p-6 bg-white">
      <h2 className="text-xl font-semibold mb-4">Health Summary</h2>

      <ul className="space-y-2 text-sm">
        <li>Blood Pressure: 120/80</li>
        <li>Heart Rate: 72 bpm</li>
        <li>Last Checkup: Jan 2026</li>
      </ul>
    </section>
  );
}
