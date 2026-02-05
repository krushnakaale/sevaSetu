import DoctorCard from "./DoctorCard";
import React from "react";
const doctors = [
  {
    name: "Dr. Ravi Kumar",
    specialty: "Cardiologist",
    consultationFee: 500,
    photo: "/doctor1.png",
  },
  {
    name: "Dr. Meera Joshi",
    specialty: "Dermatologist",
    consultationFee: 400,
    photo: "/doctor2.png",
  },
  {
    name: "Dr. Anil Patil",
    specialty: "Pediatrician",
    consultationFee: 350,
    photo: "/doctor3.png",
  },
  {
    name: "Dr. Priya Sharma",
    specialty: "General Physician",
    consultationFee: 300,
    photo: "/doctor4.png",
  },
];

export default function DoctorList() {
  return (
    <section className="py-16 max-w-7xl mx-auto px-4 bg-gray-50">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Available Doctors
      </h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
        {doctors.map((doc, i) => (
          <DoctorCard key={i} doctor={doc} />
        ))}
      </div>
    </section>
  );
}
