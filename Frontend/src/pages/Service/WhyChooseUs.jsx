export default function WhyChooseUs() {
  const points = [
    "Built specifically for students preparing for interviews",
    "AI-powered mock interviews with real-time feedback",
    "Voice and camera-based practice for real interview experience",
    "Progress tracking to measure improvement over time",
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* LEFT SIDE – CONTENT */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {points.map((point, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition"
              >
                <p className="text-gray-800 font-medium">{point}</p>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE – POINTS */}

          <div>
            <span className="uppercase tracking-widest text-sm font-semibold text-blue-600">
              Why Choose AIPP
            </span>

            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3 mb-6 leading-tight">
              A Smarter Way to Prepare for Interviews
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              AIPP is designed to solve one simple problem — students often lack
              real interview practice. Our platform bridges this gap by offering
              realistic AI-powered mock interviews that help students gain
              confidence and improve faster.
            </p>

            <p className="text-gray-600 text-lg leading-relaxed">
              Whether you are preparing for your first interview or refining
              your skills, AIPP gives you the tools to practice, learn, and
              succeed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
