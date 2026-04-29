"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image?: string;
}

export default function EditProductForm({ product }: { product: Product }) {
  const router = useRouter();
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState<number | "">(product.price);
  const [description, setDescription] = useState(product.description);
  const [image, setImage] = useState(product.image || "");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/admin/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          price: Number(price),
          description,
          image,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Failed to update product");
        setLoading(false);
        return;
      }

      alert("Product updated successfully!");
      router.push("/admin/products");
    } catch (err) {
      alert("Failed to update product");
      setLoading(false);
    }
  }

  return (
    <form
    onSubmit={handleSubmit}
    className="max-w-3xl mx-auto bg-gray-900 p-8 rounded-2xl shadow-xl space-y-6 text-white"
    >
    <h1 className="text-4xl font-bold text-center text-blue-400 mb-6">
        Edit Product
    </h1>

    <div>
        <label className="block mb-2 font-semibold">Name</label>
        <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    </div>

    <div>
        <label className="block mb-2 font-semibold">Price (Rp)</label>
        <input
        type="number"
        value={price}
        onChange={(e) =>
            setPrice(e.target.value === "" ? "" : Number(e.target.value))
        }
        className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    </div>

    <div>
        <label className="block mb-2 font-semibold">Description</label>
        <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
        className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    </div>

    <div>
        <label className="block mb-2 font-semibold">Image URL</label>
        <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    </div>

    <button
        type="submit"
        disabled={loading}
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-xl transition-colors"
    >
        {loading ? "Updating..." : "Update Product"}
    </button>
    </form>

  );
}
