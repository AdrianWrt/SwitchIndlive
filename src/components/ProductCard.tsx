"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden transform transition-transform hover:-translate-y-1 hover:shadow-2xl duration-300">
      <Link href={`/products/${product.id}`}>
        <div className="relative h-48 w-full cursor-pointer overflow-hidden rounded-t-xl group">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-25 opacity-0 group-hover:opacity-25 transition-opacity duration-300"></div>
          <h2 className="absolute bottom-2 left-2 text-white font-semibold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {product.name}
          </h2>
        </div>

        <div className="p-4">
          <h2 className="font-semibold text-lg mb-1">{product.name}</h2>
          <p className="text-gray-400">Rp {product.price.toFixed(2)}</p>
        </div>
      </Link>

      <button
        onClick={() => addToCart({ ...product, quantity: 1})}
        className="m-4 w-[calc(100%-2rem)] bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all transform hover:scale-105"
      >
        Add to Cart
      </button>
    </div>
  );
}
