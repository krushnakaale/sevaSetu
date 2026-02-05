import { Heart, Thermometer, Baby, Stethoscope } from "lucide-react";
import React from "react";

const specialties = [
  { name: "Cardiologist", icon: <Heart className="w-4 h-4" /> },
  { name: "Dermatologist", icon: <Thermometer className="w-4 h-4" /> },
  { name: "Pediatrician", icon: <Baby className="w-4 h-4" /> },
  { name: "General Physician", icon: <Stethoscope className="w-4 h-4" /> },
];

export default function DoctorFilter() {
  return (
    <section className="py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 flex flex-wrap gap-4 justify-center">
        {specialties.map((spec, i) => (
          <button
            key={i}
            className="flex items-center gap-2 px-5 py-3 bg-white text-gray-900 border border-gray-300 rounded-xl hover:bg-gray-100 hover:shadow-md transition font-medium"
          >
            {spec.icon}
            <span>{spec.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
