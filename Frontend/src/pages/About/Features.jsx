import { FaBook, FaChartLine, FaCertificate, FaUsers } from "react-icons/fa";

export default function Features() {
  const features = [
    {
      icon: <FaBook />,
      title: "Interactive Courses",
      description:
        "Learn at your own pace with structured lessons and hands-on practice.",
    },
    {
      icon: <FaChartLine />,
      title: "Progress Tracking",
      description:
        "Track growth, spot gaps, and know exactly what to improve next.",
    },
    {
      icon: <FaCertificate />,
      title: "Skill Badges & Certificates",
      description: "Earn proof of your skills and showcase your achievements.",
    },
    {
      icon: <FaUsers />,
      title: "Community Support",
      description: "Learn together with peers, mentors, and interview experts.",
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* SECTION HEADER */}
        <span className="uppercase tracking-wide text-sm font-semibold text-purple-600">
          Features
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-8 text-blue-900">
          Everything You Need to Succeed
        </h2>

        {/* FEATURES GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl px-4 p-8 shadow-sm hover:shadow transition-all duration-300 hover:-translate-y-2 border-2"
            >
              {/* ICON */}
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 text-3xl group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                {feature.icon}
              </div>

              {/* TEXT */}
              <h3 className="font-semibold text-lg mb-3 text-blue-900">
                {feature.title}
              </h3>
              <p className="text-blue-700 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
