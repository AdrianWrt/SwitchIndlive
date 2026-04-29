"use client";

import ProductCard from "@/components/ProductCard";
import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  <main className="p-8 bg-gray-900 min-h-screen text-white">
  <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-400">
    Our Products
  </h1>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
    {products.map((p) => (
      <ProductCard
        key={p.id}
        product={p}
        className="transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl rounded-xl bg-gray-800"
      />
    ))}
  </div>
</main>

  async function fetchProducts(query = "") {
    const res = await fetch(`/api/products?search=${query}`);
    const data = await res.json();
    setProducts(data.products);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🔥 auto search saat user ngetik
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchProducts(search);
    }, 300); // debounce

    return () => clearTimeout(delay);
  }, [search]);

  

  return (
    <div className="p-6">
      {/* 🔍 Search Input */}
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />

      {/* Produk */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((p) => (
      <ProductCard
        key={p.id}
        product={p}
        className="transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl rounded-xl bg-gray-800"
      />
    ))}
  </div>
    </div>
  );
}