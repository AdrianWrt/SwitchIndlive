import { prisma } from "@/lib/prisma";
import EditProductForm from "./EditProductForm";

interface Props {
  params: { id: string };
}

export default async function EditProductPage({
  params,

}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

  const numericId = Number(id);
  const isNumericId = !isNaN(numericId);

  const product = await prisma.product.findUnique({
    where: isNumericId ? { id: (await params).id } : { id },
  });

  if (!product) {
    return (
      <p className="p-8 text-white text-center text-xl">
        Product not found
      </p>
    );
  }

  return <EditProductForm product={product} />;
}
