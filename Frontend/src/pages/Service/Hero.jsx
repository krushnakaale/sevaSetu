export default function Hero() {
  return (
    <section className="relative bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Content */}
        <div className="relative py-12 sm:py-12">
          <h1 className="text-3xl sm:text-4xl md:text-4xl font-bold text-black mb-4 leading-snug">
            Our Services
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-black mb-8 max-w-2xl mx-auto leading-relaxed">
            Explore the range of services we offer to help your business grow.
            From web development to digital marketing, we’ve got you covered.
          </p>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded-lg shadow-md transition duration-300 ease-in-out">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}
