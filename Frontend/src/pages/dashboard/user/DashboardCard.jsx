export default function DashboardCard({ title, value, icon, highlight }) {
  return (
    <div
      className={`p-5 rounded-xl shadow bg-white flex items-center justify-between
      ${highlight ? "border border-red-300" : ""}`}
    >
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
      </div>
      <div className="text-yellow-500">{icon}</div>
    </div>
  );
}
