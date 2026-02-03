import { FaBook, FaMedal, FaClock, FaCertificate } from "react-icons/fa";

export default function Progress() {
  return (
    <section className="py-24 text-center">
      <div className="max-w-6xl mx-auto px-4">
        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-blue-900">
          Track Your Learning Progress
        </h2>

        {/* Subtitle */}
        <p className="mb-12 text-blue-700 text-lg">
          Stay motivated by seeing your achievements and what’s next on your
          learning journey.
        </p>

        {/* Progress Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Courses Completed */}
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center">
            <FaBook className="text-blue-600 text-4xl mb-4" />
            <h3 className="font-semibold text-lg mb-2">Courses Completed</h3>
            <p className="text-blue-900 font-bold text-2xl mb-4">12 / 20</p>
            <div className="w-full bg-blue-100 rounded-full h-3">
              <div
                className="bg-blue-900 h-3 rounded-full"
                style={{ width: "60%" }}
              ></div>
            </div>
          </div>

          {/* Skills Mastered */}
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center">
            <FaMedal className="text-blue-600 text-4xl mb-4" />
            <h3 className="font-semibold text-lg mb-2">Skills Mastered</h3>
            <p className="text-blue-900 font-bold text-2xl mb-4">
              8 new skills
            </p>
            <div className="w-full bg-blue-100 rounded-full h-3">
              <div
                className="bg-blue-900 h-3 rounded-full"
                style={{ width: "40%" }}
              ></div>
            </div>
          </div>

          {/* Hours Spent Learning */}
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center">
            <FaClock className="text-blue-600 text-4xl mb-4" />
            <h3 className="font-semibold text-lg mb-2">Hours Spent Learning</h3>
            <p className="text-blue-900 font-bold text-2xl mb-4">45h</p>
            <div className="w-full bg-blue-100 rounded-full h-3">
              <div
                className="bg-blue-900 h-3 rounded-full"
                style={{ width: "70%" }}
              ></div>
            </div>
          </div>

          {/* Certificates Earned */}
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center">
            <FaCertificate className="text-blue-600 text-4xl mb-4" />
            <h3 className="font-semibold text-lg mb-2">Certificates Earned</h3>
            <p className="text-blue-900 font-bold text-2xl mb-4">3</p>
            <div className="w-full bg-blue-100 rounded-full h-3">
              <div
                className="bg-blue-900 h-3 rounded-full"
                style={{ width: "30%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
