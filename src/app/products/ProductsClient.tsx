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
  const switchInfo = {
    Linear: {
      icon:"🎮",
      title: "Linear Switch",
      description:
        "Linear switch memiliki karakteristik penekanan yang halus tanpa tactile bump maupun suara klik. Jenis switch ini umumnya dipilih oleh gamer karena memberikan respons yang cepat dan konsisten.",
    },
    Tactile: {
      icon:"⌨️",
      title: "Tactile Switch",
      description:
        "Tactile switch memiliki tactile bump pada titik aktuasi sehingga pengguna dapat merasakan saat tombol berhasil ditekan. Jenis ini cocok untuk mengetik dan penggunaan sehari-hari.",
    },
    Clicky: {
      icon:"🔊",
      title: "Clicky Switch",
      description:
        "Clicky switch menghasilkan suara klik yang jelas saat ditekan. Jenis switch ini banyak digunakan oleh pengguna yang menyukai pengalaman mengetik yang lebih responsif dan memberikan umpan balik suara.",
    },
  };

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

  const currentType =
  search === "Linear" ||
  search === "Tactile" ||
  search === "Clicky"
    ? search
    : null;

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

      {currentType && (
        <div className="mb-8 p-6 bg-gray-800 rounded-xl border border-gray-700">
          <h2 className="text-2xl font-bold text-blue-400 mb-2">
            {switchInfo[currentType as keyof typeof switchInfo].icon}{" "}
            {switchInfo[currentType as keyof typeof switchInfo].title}
          </h2>

          <p className="text-gray-300 leading-relaxed">
            {
              switchInfo[currentType as keyof typeof switchInfo]
                .description
            }
          </p>
        </div>
      )}

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