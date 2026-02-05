import MedicineCard from "./MedicineCard";
import React from "react";
const MEDICINES = [
  { id: 1, name: "Paracetamol", brand: "Cipla", price: 50 },
  { id: 2, name: "Ibuprofen", brand: "GSK", price: 120 },
  { id: 3, name: "Vitamin D", brand: "Himalaya", price: 200 },
  { id: 4, name: "Cough Syrup", brand: "Dabur", price: 150 },
];

export default function MedicineList({ onAdd }) {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-6">Available Medicines</h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {MEDICINES.map((med) => (
            <MedicineCard key={med.id} medicine={med} onAdd={onAdd} />
          ))}
        </div>
      </div>
    </section>
  );
}
