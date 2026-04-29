import { prisma } from "@/lib/prisma";
import ProductDetailsClient from "./ProductDetailsClient";

export default async function ProductPage({ params }: any) {
  const resolvedParams = await params;

  console.log("PARAMS:", resolvedParams);

  const id = resolvedParams.id;

  if (!id) {
    return <div>Product ID missing</div>;
  }

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    return <div>Product not found</div>;
  }

  const safeProduct = {
    ...product,
    image: product.image ?? "",
    description: product.description ?? "",
  };

  return <ProductDetailsClient product={safeProduct} />;
}