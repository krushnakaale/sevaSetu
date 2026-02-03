export default function Notifications({ notifications }) {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-2">Notifications</h2>
      <ul className="bg-white rounded shadow p-4 space-y-2">
        {notifications.map((n, i) => (
          <li key={i} className="border-b pb-1">
            <span className="font-semibold">{n.title}</span> - {n.message}
          </li>
        ))}
      </ul>
    </div>
  );
}
