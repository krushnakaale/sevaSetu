import DoctorCard from "./DoctorCard";
import React from "react";

export default function DoctorList({ doctors = [], loading, onSelectDoctor }) {
  if (loading) return <p className="text-center py-10">Loading doctors...</p>;

  if (!doctors.length)
    return <p className="text-center py-10">No doctors available</p>;

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 bg-gray-50">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Available Doctors
      </h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
        {doctors.map((doc) => (
          <DoctorCard key={doc._id} doctor={doc} onSelect={onSelectDoctor} />
        ))}
      </div>
    </section>
  );
}
