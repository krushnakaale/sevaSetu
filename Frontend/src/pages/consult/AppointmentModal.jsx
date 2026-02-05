import React from "react";

export default function AppointmentModal({ doctor, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold text-[#111827] mb-4">
          Book Appointment with {doctor.name}
        </h2>
        <input
          type="date"
          className="w-full border border-gray-300 rounded-lg p-2 mb-3"
        />
        <input
          type="time"
          className="w-full border border-gray-300 rounded-lg p-2 mb-3"
        />
        <button className="w-full bg-[#FACC15] text-[#111827] py-2 rounded-lg font-semibold hover:opacity-90">
          Confirm Appointment
        </button>
        <button
          className="mt-2 w-full border border-gray-300 text-[#111827] py-2 rounded-lg hover:bg-gray-100"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
