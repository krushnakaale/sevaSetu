import React from "react";

export default function MyOrders() {
  return (
    <section className="p-6 bg-white">
      <h2 className="text-xl font-semibold mb-4">My Orders</h2>

      <table className="w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Order ID</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2 border">ORD1023</td>
            <td className="p-2 border">12 Jan 2026</td>
            <td className="p-2 border">Delivered</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
