import React from "react";

export default function DoctorCard({ doctor, onSelect }) {
  return (
    <div
      className="bg-white text-black border border-gray-300 rounded-xl p-6 shadow-md hover:shadow-lg transition cursor-pointer"
      onClick={() => onSelect(doctor)}
    >
      <div className="flex items-center gap-4">
        <img
          src={doctor.user?.avatar || "/images/doctor.png"}
          alt={doctor.user?.name || "Doctor"}
          className="w-16 h-16 rounded-full object-cover border"
        />

        <div>
          <h2 className="text-xl font-semibold">{doctor.user?.name}</h2>

          <p className="text-gray-600">{doctor.specialization}</p>

          {doctor.rating && (
            <p className="text-sm text-yellow-600 font-medium">
              ⭐ {doctor.rating}
            </p>
          )}
        </div>
      </div>

      <p className="mt-4 text-gray-700 line-clamp-3">
        {doctor.about || "Experienced doctor available for consultation."}
      </p>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-800">
          ₹{doctor.consultationFee}
        </span>

        <button
          className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 font-medium"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(doctor);
          }}
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
}
