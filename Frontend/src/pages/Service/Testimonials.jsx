export default function Testimonials() {
  const testimonials = [
    {
      name: "Aarav S.",
      role: "Engineering Student",
      feedback:
        "AIPP's AI mock interviews helped me practice with real-time feedback. I felt confident going into my first campus interview!",
    },
    {
      name: "Meera P.",
      role: "MBA Student",
      feedback:
        "The voice and camera-based mock interviews were so realistic. I could track my progress and improve my answers effectively.",
    },
    {
      name: "Rohan K.",
      role: "Final Year Student",
      feedback:
        "I loved how AIPP saved all my interviews on the dashboard. Reviewing my performance helped me identify gaps and grow faster.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 text-center">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-gray-900">
          What Our Students Say
        </h2>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300"
            >
              <p className="italic text-gray-700 leading-relaxed mb-4">
                “{t.feedback}”
              </p>
              <p className="font-semibold text-gray-900">{t.name}</p>
              <p className="text-gray-500 text-sm">{t.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
