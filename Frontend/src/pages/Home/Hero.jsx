export default function Hero() {
  const handleGetStarted = () => {
    window.location.href = "/login";
  };

  return (
    <section className="relative max-w-7xl mx-auto overflow-hidden">
      {/* VIDEO WRAPPER */}
      <div className="relative w-full aspect-video max-h-[60h] max-h-[85vh]">
        <video
          src="/videos/sample-interview.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/90 to-black/40" />

        {/* CONTENT */}
        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-12 flex items-center">
          <div className="w-full md:max-w-2xl text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-white leading-tight mb-4">
              Experience Real Interviews, Live
            </h1>

            <p className="text-gray-200 text-base sm:text-lg mb-6 leading-relaxed">
              Watch real candidates answer live interview questions. Practice
              alongside, improve your skills, and build the confidence to
              succeed in your next interview.
            </p>

            <button
              onClick={handleGetStarted}
              className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-8 py-3 rounded-lg font-semibold shadow-lg transition transform hover:scale-105 duration-300"
            >
              Try to Mock Interview
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
