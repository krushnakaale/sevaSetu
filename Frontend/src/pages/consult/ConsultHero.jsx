import React from "react";

export default function Hero() {
  return (
    <section className="bg-white text-gray-900 py-24">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          Consult Doctors Online
        </h1>
        <p className="mt-4 text-gray-600 text-lg">
          Talk to verified doctors from the comfort of your home.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <input
            type="text"
            placeholder="Search doctor or specialty..."
            className="px-5 py-3 w-72 rounded-l-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder-gray-400"
          />
          <button className="px-6 py-3 rounded-r-xl bg-gray-900 text-white font-semibold hover:bg-gray-700 transition">
            Search
          </button>
        </div>
        <div className="mt-8 flex justify-center gap-6 text-gray-500 text-sm">
          <span>Cardiology</span>
          <span>Dermatology</span>
          <span>Pediatrics</span>
          <span>Neurology</span>
        </div>
      </div>
    </section>
  );
}
