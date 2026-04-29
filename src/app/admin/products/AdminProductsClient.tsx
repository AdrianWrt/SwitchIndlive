"use client";

import { useEffect, useState } from "react";
import AddProductForm from "./AddProductForm";
import AdminProductRow from "./AdminProductRow";

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
};

export default function AdminProductsClient() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchProducts() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/products");
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data.products);
    } catch (err) {
      console.error(err);
      alert("Error fetching products");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  function updateProduct(updated: Product) {
    setProducts((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
  }

  function removeProduct(id: string) {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  function addProduct(product: Product) {
    setProducts((prev) => [...prev, product]);
  }

  if (loading) return <p>Loading products...</p>;

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Products</h1>

      <AddProductForm onAdd={addProduct} />

      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Price</th>
            <th className="border px-2 py-1">Description</th> {/* ✅ added */}
            <th className="border px-2 py-1">Image</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <AdminProductRow
              key={p.id}
              product={p}
              onUpdate={updateProduct}
              onDelete={removeProduct}
            />
          ))}
        </tbody>
      </table>
    </main>
  );
}
