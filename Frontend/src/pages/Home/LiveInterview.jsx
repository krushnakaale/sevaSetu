export default function LiveInterview() {
  return (
    <section className="relative max-w-7xl mx-auto h-screen overflow-hidden">
      {/* VIDEO BACKGROUND */}
      <video
        src="/videos/sample-interview.mp4"
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/100 to-transparent"></div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 flex flex-col justify-center h-full text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4 md:mb-6">
          Experience a Real Interview
        </h2>
        <p className="text-gray-100 text-lg md:text-2xl max-w-3xl mb-6 md:mb-8 leading-relaxed mx-auto md:mx-0">
          Watch how a real candidate answers live interview questions. Practice
          alongside, improve your skills, and build confidence for your next
          interview.
        </p>
        <div className="flex justify-center md:justify-start">
          <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-10 py-4 rounded-lg font-semibold text-lg transition">
            Try a Mock Interview
          </button>
        </div>
      </div>
    </section>
  );
}
