import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
);

export default function AnalyticsGraph({ courses }) {
  // Pie Chart Data
  const completed = courses.filter((c) => c.progress === 100).length;
  const pending = courses.length - completed;

  const pieData = {
    labels: ["Completed Courses", "Pending Courses"],
    datasets: [
      {
        label: "Courses Status",
        data: [completed, pending],
        backgroundColor: ["#10B981", "#FBBF24"], // green / yellow
        borderColor: ["#065F46", "#B45309"],
        borderWidth: 1,
      },
    ],
  };

  // Bar Chart Data (each course progress)
  const barData = {
    labels: courses.map((c) => c.name),
    datasets: [
      {
        label: "Progress %",
        data: courses.map((c) => c.progress),
        backgroundColor: "#3B82F6",
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <div className="bg-white rounded-lg shadow p-5">
        <h2 className="font-bold mb-3 text-lg">Courses Status Pie Chart</h2>
        <Pie data={pieData} />
      </div>

      <div className="bg-white rounded-lg shadow p-5">
        <h2 className="font-bold mb-3 text-lg">Course Progress Bar Chart</h2>
        <Bar data={barData} />
      </div>
    </div>
  );
}
