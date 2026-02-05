import { useState } from "react";
import React from "react";
export default function PrescriptionUpload() {
  const [file, setFile] = useState(null);
  const [notes, setNotes] = useState("");

  return (
    <section className="py-12 max-w-7xl mx-auto px-6 bg-white border rounded-xl shadow-sm">
      <h2 className="text-3xl font-semibold mb-2">Upload Prescription</h2>
      <p className="text-gray-600 mb-6">
        Upload prescription for restricted medicines.
      </p>

      <input
        type="file"
        accept="image/*,application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
        className="w-full border rounded-md p-3 mb-4"
      />

      <textarea
        placeholder="Notes for pharmacy (optional)"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="w-full border rounded-md p-3 h-24 resize-none mb-4"
      />

      <button className="w-full bg-yellow-400 hover:bg-yellow-500 py-3 rounded-md font-semibold">
        Upload Prescription
      </button>
    </section>
  );
}
