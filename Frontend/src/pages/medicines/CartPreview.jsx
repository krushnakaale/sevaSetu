import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import React from "react";
// Dummy user login state (replace with real auth)
const isLoggedIn = true;

const INITIAL_CART = [
  { id: 1, name: "Paracetamol", price: 50, qty: 1 },
  { id: 2, name: "Ibuprofen", price: 120, qty: 2 },
];

export default function CartPreview() {
  const [cartItems, setCartItems] = useState(INITIAL_CART);
  const [isOpen, setIsOpen] = useState(false);

  const updateQty = (id, type) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              qty: type === "inc" ? item.qty + 1 : Math.max(1, item.qty - 1),
            }
          : item,
      ),
    );
  };

  const total = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);

  if (!isLoggedIn) {
    return (
      <div className="fixed right-6 top-24">
        <p className="bg-gray-100 p-3 rounded-lg shadow text-gray-700">
          Login to view your cart
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Cart Icon */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed right-6 top-24 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-900 transition z-50"
      >
        <FaShoppingCart size={20} />
      </button>

      {/* Cart Panel */}
      {isOpen && (
        <aside className="fixed right-6 top-32 w-80 bg-white p-6 rounded-xl border shadow-lg z-50">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Cart Summary</h3>

          {cartItems.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <ul className="divide-y">
              {cartItems.map((item) => (
                <li key={item.id} className="py-3 flex justify-between">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => updateQty(item.id, "dec")}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span>{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, "inc")}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <span className="font-semibold">
                    ₹{item.price * item.qty}
                  </span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-4 flex justify-between font-semibold">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button className="mt-6 w-full bg-gray-800 hover:bg-gray-900 text-gray-100 py-3 rounded-lg font-semibold">
            Checkout
          </button>
        </aside>
      )}
    </>
  );
}
