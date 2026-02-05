import { FaAmbulance, FaPhoneAlt, FaUser } from "react-icons/fa";
import React from "react";

const contacts = [
  { name: "Ambulance", number: "108", icon: <FaAmbulance /> },
  { name: "Police", number: "100", icon: <FaPhoneAlt /> },
  { name: "Family Member", number: "9876543210", icon: <FaUser /> },
];

export default function EmergencyContacts() {
  return (
    <section className="py-6 max-w-7xl mx-auto px-4">
      <div className="bg-gray-100 border border-gray-200 rounded-lg p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          Emergency Contacts
        </h2>

        <ul className="space-y-2">
          {contacts.map((c, i) => (
            <li
              key={i}
              className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md border border-gray-200 hover:shadow transition"
            >
              <div className="flex items-center gap-3">
                <span className="text-gray-600 text-xl">{c.icon}</span>
                <div>
                  <p className="font-medium text-gray-800 text-sm">{c.name}</p>
                  <p className="text-gray-500 text-xs">{c.number}</p>
                </div>
              </div>

              <a
                href={`tel:${c.number}`}
                className="inline-flex items-center gap-1 bg-gray-800 text-white px-3 py-1 rounded text-xs font-medium hover:bg-gray-900 transition"
              >
                Call
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
