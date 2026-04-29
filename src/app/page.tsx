import HomePageClient from "./HomePageClient";
import { prisma } from "@/lib/prisma";


export default async function HomePage() {
  const products = await prisma.product.findMany({
    take: 6,
    orderBy: { createdAt: "desc" },
  });

  const safeProducts = products.map((p) => ({
    ...p,
    image: p.image || "/no-image.png",
  }));

  return <HomePageClient products={safeProducts} />;
}
