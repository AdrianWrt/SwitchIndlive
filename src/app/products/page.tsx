"use client";

import ProductCard from "@/components/ProductCard";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Product } from "@prisma/client";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");

  const searchParams = useSearchParams();

  async function fetchProducts(query = "") {
    const res = await fetch(`/api/products?search=${query}`);
    const data = await res.json();
    setProducts(data.products || []);
  }

  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    setSearch(urlSearch);
  }, [searchParams]);

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchProducts(search);
    }, 300); 

    return () => clearTimeout(delay);
  }, [search]);

  return (
    <main className="p-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-400">
        Our Products
      </h1>
  
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-700 bg-gray-800 p-2 rounded w-full mb-6 text-white"
      />
  
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
          />
        ))}
      </div>
    </main>
  );
}