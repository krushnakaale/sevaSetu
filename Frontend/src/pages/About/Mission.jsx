export default function Mission() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          {/* LEFT – IMAGE */}
          <div className="w-full h-80 md:h-[420px] rounded-2xl overflow-hidden shadow-lg">
            <img
              src="/images/mission.png"
              alt="Students practicing AI-powered interviews"
              className="w-full h-full object-cover"
            />
          </div>

          {/* RIGHT – CONTENT */}
          <div>
            <span className="uppercase tracking-widest text-sm font-semibold text-blue-600">
              Our Mission
            </span>

            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-6 text-blue-900 leading-tight">
              Helping Students Turn Practice into Interview Success
            </h2>

            <p className="text-blue-700 text-lg leading-relaxed mb-8">
              Our mission is to make interview preparation practical,
              accessible, and effective. By simulating real interview
              environments with AI, voice, and camera, we help students gain
              clarity on their skills, improve continuously, and walk into
              interviews with confidence.
            </p>

            <ul className="space-y-4 text-blue-800 font-medium">
              <li className="flex items-start gap-2">
                <span>🎙️</span>
                <span>Practice realistic interviews using voice & video</span>
              </li>
              <li className="flex items-start gap-2">
                <span>📊</span>
                <span>Receive detailed feedback and performance insights</span>
              </li>
              <li className="flex items-start gap-2">
                <span>📈</span>
                <span>Track improvement with every mock interview</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
