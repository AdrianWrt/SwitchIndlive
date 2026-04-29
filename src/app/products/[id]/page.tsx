import { prisma } from "@/lib/prisma";
import ProductDetailsClient from "./ProductDetailsClient";
import Link from "next/link";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;

  if (!id) {
    return (
      <main className="p-12 bg-gray-900 text-white text-center">
        <h1 className="text-3xl font-bold">Product ID missing</h1>
        <Link href="/" className="mt-4 inline-block text-blue-500 hover:underline">
          Back to Home
        </Link>
      </main>
    );
  }

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    return (
      <main className="p-12 bg-gray-900 text-white text-center">
        <h1 className="text-3xl font-bold">Product Not Found</h1>
        <Link href="/" className="mt-4 inline-block text-blue-500 hover:underline">
          Back to Home
        </Link>
      </main>
    );
  }

  const safeProduct = {
    ...product,
    image: product.image ?? "",
    description: product.description ?? "",
  };

  return <ProductDetailsClient product={safeProduct} />;
}