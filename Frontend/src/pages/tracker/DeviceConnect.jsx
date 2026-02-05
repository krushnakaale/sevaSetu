import React from "react";

export default function DeviceConnect() {
  return (
    <section className="py-12 max-w-7xl mx-auto px-4 rounded-xl shadow-sm">
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Text Section */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            Connect Your Device
          </h2>
          <p className="text-gray-700 mb-6">
            Sync your smartwatch or smart band to monitor your vitals
            automatically and stay updated in real-time.
          </p>
          <button className="px-6 py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition">
            Connect Device
          </button>
        </div>

        {/* Image Section */}
        <div className="flex flex-1 items-center justify-center h-full">
          <img
            src="/images/device.png"
            alt="Smart Band"
            className="w-64 h-auto"
          />
        </div>
      </div>
    </section>
  );
}
