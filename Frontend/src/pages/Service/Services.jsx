export default function Services() {
  const services = [
    {
      title: "AI Mock Interviews",
      desc: "Practice real interview questions with AI in a realistic interview environment.",
    },
    {
      title: "Voice & Camera Practice",
      desc: "Simulate real interviews using voice and camera to build confidence and communication skills.",
    },
    {
      title: "Smart AI Feedback",
      desc: "Receive clear feedback on answers, confidence, body language, and speaking skills.",
    },
    {
      title: "Progress Tracking Dashboard",
      desc: "View past interviews, track improvement, and understand your growth over time.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* LEFT SIDE – CONTENT */}
          <div>
            <span className="uppercase tracking-widest text-sm font-semibold text-blue-600">
              Our Services
            </span>

            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3 mb-6 leading-tight">
              Everything You Need to Prepare for Interviews
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Our platform is built specifically for students who want to
              practice interviews in a realistic way. Using AI-powered tools, we
              help you improve communication, confidence, and overall interview
              performance.
            </p>

            <p className="text-gray-600 text-lg leading-relaxed">
              From mock interviews to detailed feedback and progress tracking,
              every feature is designed to help you perform better in real
              interviews.
            </p>
          </div>

          {/* RIGHT SIDE – SERVICES GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border border-gray-200 hover:shadow-md transition duration-300"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
