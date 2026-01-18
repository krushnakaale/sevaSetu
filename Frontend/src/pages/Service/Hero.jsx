export default function Hero() {
  return (
    <section className="bg-gray-100 py-20">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Our Services
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 mb-8">
          Explore the range of services we offer to help your business grow.
          From web development to digital marketing, we’ve got you covered.
        </p>
        <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded-lg transition-colors duration-300">
          Learn More
        </button>
      </div>
    </section>
  );
}
