"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewProductPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price: Number(price), description, image }),
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Failed to add product");
        setLoading(false);
        return;
      }

      alert("Product added successfully!");
      router.push("/admin/products");
    } catch (err) {
      alert("Failed to add product");
      setLoading(false);
    }
  }

  return (
    <main className="p-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-400">
        Add New Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg space-y-6"
      >
        <div>
          <label className="block mb-2 font-semibold">Product Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">Price (Rp)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
            className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            min={0}
            step={0.01}
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">Image URL</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition-colors"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </main>
  );
}
