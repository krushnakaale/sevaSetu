export default function CallToAction() {
  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT SIDE – TEXT */}
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-4xl font-extrabold text-blue-900 mb-4 leading-tight">
              Ready to Level Up Your Skills?
            </h2>
            <p className="text-lg sm:text-xl text-blue-700 mb-6 leading-relaxed">
              Join a platform designed specifically for students to practice
              interviews, track their progress, and get AI-driven feedback.
            </p>
            <button
              className="bg-gradient-to-r from-blue-700 to-blue-900 text-white px-10 py-4 rounded-lg font-semibold shadow-md
                         hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              Start Learning
            </button>
          </div>

          {/* RIGHT SIDE – IMAGE WITH MIX-BLEND */}
          <div className="w-full h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden shadow-lg relative">
            <img
              src="/images/cta.png"
              alt="Students practicing interviews"
              className="w-full h-full object-cover mix-blend-mode"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
