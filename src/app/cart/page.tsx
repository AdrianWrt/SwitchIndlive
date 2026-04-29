"use client";

import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, removeFromCart, increase, decrease } = useCart();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="p-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-400">
        Your Cart
      </h1>

      {items.length === 0 ? (
        <p className="text-gray-400 text-center text-lg">
          Your cart is empty.
        </p>
      ) : (
        <div className="space-y-6 max-w-5xl mx-auto">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center p-4 bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-shadow"
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg mr-4"
                />
              )}

              <div className="flex-1 flex flex-col justify-center">
                <h2 className="font-semibold text-lg">{item.name}</h2>
                <p className="text-gray-400">Rp {item.price.toFixed(2)} each</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => decrease(item.id)}
                  className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 transition-colors"
                >
                  –
                </button>
                <span className="px-2">{item.quantity}</span>
                <button
                  onClick={() => increase(item.id)}
                  className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 transition-colors"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="ml-4 text-red-500 hover:text-red-400 font-semibold"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Total */}
          <div className="text-right text-2xl font-bold mt-6 text-blue-400">
            Total: Rp {total.toFixed(2)}
          </div>

          {/* Checkout button */}
          <a
            href="/checkout"
            className="block text-center mt-6 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-semibold transition-colors"
          >
            Proceed to Checkout
          </a>
        </div>
      )}
    </main>
  );
}
