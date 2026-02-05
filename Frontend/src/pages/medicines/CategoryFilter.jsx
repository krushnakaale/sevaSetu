import {
  FaPills,
  FaSyringe,
  FaHeart,
  FaHospital,
  FaBaby,
  FaFirstAid,
} from "react-icons/fa";
import React from "react";

const categories = [
  { name: "Tablets", icon: <FaPills /> },
  { name: "Syrups", icon: <FaSyringe /> },
  { name: "Diabetes", icon: <FaHeart /> },
  { name: "BP", icon: <FaHospital /> },
  { name: "First Aid", icon: <FaFirstAid /> },
  { name: "Baby Care", icon: <FaBaby /> },
];

export default function CategoryFilter() {
  return (
    <section className="py-12 bg-gray-50 border-b">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
          Browse by Category
        </h2>

        <div className="flex flex-wrap justify-between gap-4">
          {categories.map((cat, i) => (
            <button
              key={i}
              className="flex items-center gap-2 px-5 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 hover:scale-105 transition transform font-semibold shadow-sm"
            >
              <span className="text-lg">{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
