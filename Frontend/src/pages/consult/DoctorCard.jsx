import React from "react";

export default function DoctorCard({ doctor, onSelect }) {
  return (
    <div
      className="bg-white text-black border border-gray-300 rounded-xl p-6 shadow-md hover:shadow-lg transition cursor-pointer"
      onClick={() => onSelect(doctor)}
    >
      <div className="flex items-center gap-4">
        <img
          src={doctor.photo}
          alt={doctor.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h2 className="text-xl font-semibold">{doctor.name}</h2>
          <p className="text-gray-600">{doctor.specialty}</p>
        </div>
      </div>
      <p className="mt-4 text-gray-700">{doctor.description}</p>
      <button className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 font-medium">
        Book Appointment
      </button>
    </div>
  );
}
