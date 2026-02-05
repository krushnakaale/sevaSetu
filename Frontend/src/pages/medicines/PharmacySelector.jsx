import React, { useEffect, useState } from "react";
import { getPharmacies } from "../../api/pharmacy";

export default function PharmacySelector() {
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPharmacies() {
      try {
        setLoading(true);
        const data = await getPharmacies(); // fetch from backend
        setPharmacies(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchPharmacies();
  }, []);

  if (loading) {
    return (
      <div className="py-12 text-center text-gray-500">
        Loading pharmacies...
      </div>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
          Nearby Pharmacies
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {pharmacies.map((ph) => (
            <div
              key={ph._id}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition"
            >
              <h3 className="font-semibold text-gray-900 text-lg mb-2">
                {ph.pharmacyName}
              </h3>
              {ph.address?.city && (
                <p className="text-sm text-gray-500 mb-1">
                  City: {ph.address.city}
                </p>
              )}
              <p className="text-sm text-gray-500 mb-4">
                Rating: {ph.rating || "N/A"}
              </p>

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
