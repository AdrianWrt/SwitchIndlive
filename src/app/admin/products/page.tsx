import { prisma } from "@/lib/prisma";
import Link from "next/link";
import DeleteProductButton from "@/components/DeleteProductButton";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany();

  return (
    <main className="p-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-400">
        Manage Products
      </h1>

      <div className="text-center mb-8">
        <Link
          href="/admin/products/new"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          + Add New Product
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col transform transition-transform hover:-translate-y-1 hover:shadow-2xl duration-300"
          >
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                className="h-48 w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            )}

            <div className="p-4 flex flex-col flex-1">
              <h2 className="font-semibold text-lg mb-2">{product.name}</h2>
              <p className="text-gray-400 mb-4">Rp {product.price.toFixed(2)}</p>

              <div className="mt-auto flex justify-between gap-2">
                <Link
                  href={`/admin/products/${product.id}/edit`}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded transition-all transform hover:scale-105"
                >
                  Edit
                </Link>

                <DeleteProductButton id={product.id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
