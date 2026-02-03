export default function Hero() {
  return (
    <section className="bg-gray-100 py-20">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
          Contact Us
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 mb-8">
          Get in touch with us for queries, technical support, or collaboration
          opportunities. Our team is here to help you.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <button
            onClick={() => {
              const el = document.getElementById("contact-form");
              if (el) {
                el.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold px-6 py-3 rounded-lg transition"
          >
            Contact Now
          </button>

          <button className="bg-white hover:bg-gray-100 text-gray-900 font-semibold px-6 py-3 rounded-lg border transition">
            View Support Options
          </button>
        </div>
      </div>
    </section>
  );
}
