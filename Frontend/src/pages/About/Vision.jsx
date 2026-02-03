export default function Vision() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          {/* LEFT – VISION CONTENT */}
          <div>
            <span className="uppercase tracking-widest text-sm font-semibold text-blue-600">
              Our Vision
            </span>

            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-6 text-blue-900 leading-tight">
              Making Interview Preparation Smarter, Fairer, and More Accessible
            </h2>

            <p className="text-blue-700 text-lg leading-relaxed mb-8">
              We envision a future where every student has access to realistic
              interview practice. With AI-powered interviews, instant feedback,
              and performance tracking, students can prepare with confidence and
              clarity—before the real opportunity arrives.
            </p>

            <ul className="space-y-4 text-blue-800 font-medium">
              <li className="flex items-start gap-2">
                <span>🚀</span>
                <span>Practice real interview scenarios anytime, anywhere</span>
              </li>
              <li className="flex items-start gap-2">
                <span>🎯</span>
                <span>
                  Receive AI-driven feedback to identify strengths & gaps
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span>💡</span>
                <span>
                  Build confidence before facing real interview panels
                </span>
              </li>
            </ul>
          </div>

          {/* RIGHT – IMAGE */}
          <div className="w-full h-80 md:h-[420px] rounded-2xl overflow-hidden shadow-lg">
            <img
              src="/images/vision.png"
              alt="Students preparing for interviews"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
