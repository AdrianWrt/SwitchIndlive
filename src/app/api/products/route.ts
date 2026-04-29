import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const search = req.nextUrl.searchParams.get("search") || "";

    const products = await prisma.product.findMany({
      where: search
        ? {
            OR: [
              {
                name: {
                  contains: search,
                },
              },
              {
                description: {
                  contains: search,
                },
              },
            ],
          }
        : {},
    });

    return NextResponse.json({ products });
  } catch (err) {
    console.error("PRODUCTS API ERROR:", err);

    return NextResponse.json({ products: [] });
  }
}