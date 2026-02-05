import { useState } from "react";
import React from "react";
export default function SOSButton() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSOS = async () => {
    if (!confirm("Are you sure you want to send an SOS alert?")) return;

    try {
      setSending(true);

      // 🔗 Future API Hook
      // await fetch("/api/sos", { method: "POST" });

      // 📞 Emergency fallback
      window.location.href = "tel:108";

      setSent(true);
    } catch (error) {
      alert("Failed to send SOS. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      className="py-10 px-4 max-w-md mx-auto text-center"
      aria-label="Emergency SOS Section"
    >
      <button
        onClick={handleSOS}
        disabled={sending}
        aria-label="Send Emergency SOS"
        className={`w-40 h-40 sm:w-44 sm:h-44 rounded-full text-2xl font-extrabold shadow-lg transition
          flex items-center justify-center mx-auto
          ${sent ? "bg-green-600" : "bg-red-600 hover:scale-105 active:scale-95"}
          ${sending && "opacity-70 cursor-not-allowed"}`}
      >
        {sending ? "Sending..." : sent ? "Sent" : "SOS"}
      </button>

      <p className="mt-4 text-gray-700 text-sm sm:text-base">
        Press only in case of a serious medical emergency. This will alert
        emergency services immediately.
      </p>
    </section>
  );
}
