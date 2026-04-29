import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";

async function isAdmin() {
  const session = await auth();

  if (!session?.user?.email) return false;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  return user?.role === "admin";
}

export async function GET(req: NextRequest) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ products: [] }); 
    }

    const products = await prisma.product.findMany();

    return NextResponse.json({ products });
  } catch (err) {
    console.error("GET ADMIN PRODUCTS ERROR:", err);
    return NextResponse.json({ products: [] });
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 });
    }

    const { name, price, image, description } = await req.json();

    if (!name || !price || !image || !description) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const product = await prisma.product.create({
      data: { name, price, image, description },
    });

    return NextResponse.json({ product });
  } catch (err) {
    console.error("POST ADMIN PRODUCTS ERROR:", err);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}