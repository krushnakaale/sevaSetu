export default function HowItWorks() {
  return (
    <section className="flex flex-col md:flex-row max-w-7xl mx-auto py-5 shadow-lg rounded-xl overflow-hidden">
      {/* Left Side - Image */}
      <div className="md:w-1/2 h-80 md:h-auto">
        <img
          src="https://www.21kschool.com/in/wp-content/uploads/sites/4/2023/09/Discover-the-Bright-Side-The-Surprising-Benefits-of-Online-Learning.png"
          alt="Online learning illustration"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Side - Info */}
      <div className="md:w-1/2 bg-white p-8 flex flex-col justify-center">
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
          How It Works
        </h2>
        <p className="mb-6 text-gray-700 text-base md:text-lg leading-relaxed">
          Our platform makes learning simple, engaging, and effective. Whether
          you’re starting out or advancing your skills, we provide the right
          tools and guidance every step of the way.
        </p>

        {/* Step-by-Step List */}
        <h3 className="text-xl md:text-2xl font-semibold mb-3 text-gray-900 border-b pb-1 border-gray-200">
          Steps to Get Started
        </h3>
        <ul className="list-disc list-inside space-y-2 text-gray-600 text-base md:text-lg">
          <li>Sign up and create your personalized learning plan</li>
          <li>Access interactive lessons, projects, and resources</li>
          <li>Track progress and get feedback from experts</li>
          <li>Apply your skills in real-world projects</li>
        </ul>

        {/* CTA Button */}
        <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 w-max">
          Get Started
        </button>
      </div>
    </section>
  );
}
