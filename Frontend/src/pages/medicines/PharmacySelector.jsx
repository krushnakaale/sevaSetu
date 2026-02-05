import React from "react";

const PHARMACIES = [
  { id: 1, name: "City Pharmacy", distance: "0.5 km", rating: 4.5 },
  { id: 2, name: "HealthPlus", distance: "1.2 km", rating: 4.2 },
  { id: 3, name: "MediCare", distance: "2 km", rating: 4.7 },
];

export default function PharmacySelector() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
          Nearby Pharmacies
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {PHARMACIES.map((ph) => (
            <div
              key={ph.id}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition "
            >
              <h3 className="font-semibold text-gray-900 text-lg mb-2">
                {ph.name}
              </h3>
              <p className="text-sm text-gray-500 mb-1">
                Distance: {ph.distance}
              </p>
              <p className="text-sm text-gray-500 mb-4">Rating: {ph.rating}</p>

              <button className="w-full py-2 rounded-md bg-gray-800 text-gray-100 font-medium hover:bg-gray-900 transition">
                Select
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
