export default function HowItWorks() {
  const steps = [
    "Start a mock interview with AI using voice & camera",
    "Receive real-time AI feedback on your performance",
    "Track your progress and identify strengths & weaknesses",
    "Improve your skills and build confidence for real interviews",
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* LEFT SIDE – CONTENT */}
          <div>
            <span className="uppercase tracking-widest text-sm font-semibold text-blue-600">
              How It Works
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3 mb-6 leading-tight">
              Prepare Smarter, Perform Better
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Our platform helps students practice interviews realistically
              using AI. Follow these simple steps to build confidence and
              improve your performance:
            </p>
          </div>

          {/* RIGHT SIDE – STEPS */}
          <div className="grid grid-cols-1 gap-6">
            {steps.map((step, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-6 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition"
              >
                <span className="flex-shrink-0 bg-yellow-400 text-white font-bold w-10 h-10 rounded-full flex items-center justify-center text-lg">
                  {i + 1}
                </span>
                <p className="text-gray-700 font-medium">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
