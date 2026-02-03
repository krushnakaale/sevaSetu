export default function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-gray-100 to-white py-24">
      <div className="max-w-5xl mx-auto text-center px-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mt-2 mb-6">
          About AIPP
        </h1>

        <p className="text-base sm:text-xl text-gray-700 max-w-3xl mx-auto mb-10 leading-relaxed">
          AIPP is an AI-powered interview preparation platform for students.
          Practice real interviews using voice and camera, review your sessions,
          and get smart feedback to improve with every attempt.
        </p>

        <button className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-8 py-3 rounded-lg shadow-md transition transform hover:scale-105 duration-300">
          Learn More
        </button>
      </div>
    </section>
  );
}
