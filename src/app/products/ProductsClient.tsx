"use client";

import ProductCard from "@/components/ProductCard";
import { Product } from "@prisma/client";
import { useEffect, useState } from "react";
import {
  useRouter,
  usePathname,
  useSearchParams,
} from "next/navigation";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  async function fetchProducts(query = "") {
    const res = await fetch(
      `/api/products?search=${encodeURIComponent(query)}`
    );

    const data = await res.json();
    setProducts(data.products || []);
  }

  useEffect(() => {
    const query = searchParams.get("search") || "";
    setSearch(query);
    fetchProducts(query);
  }, [searchParams]);

  useEffect(() => {
    const delay = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (search) {
        params.set("search", search);
      } else {
        params.delete("search");
      }

      router.replace(`${pathname}?${params.toString()}`);
    }, 300);

    return () => clearTimeout(delay);
  }, [search, pathname, router, searchParams]);

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
        className="w-full mb-6 p-3 rounded bg-gray-800 border border-gray-700"
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