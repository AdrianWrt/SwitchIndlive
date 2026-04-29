"use client";

import { useState } from "react";
import AddToCartButton from "./AddToCartButton";

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  image: string;
}

export default function ProductDetailsClient({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <main className="bg-gray-900 text-white min-h-screen p-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="md:w-1/2 flex flex-col gap-4">
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <p className="text-gray-300">{product.description || "No description available."}</p>
          <p className="text-2xl font-semibold text-blue-500">Rp {product.price.toFixed(2)}</p>

          <div className="flex items-center gap-4 mt-4">
            <label className="text-white font-semibold">Quantity:</label>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-20 p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <AddToCartButton product={product} quantity={quantity} />
        </div>
      </div>
    </main>
  );
}
