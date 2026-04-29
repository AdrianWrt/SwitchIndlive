import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth-options";

async function isAdmin(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return false;
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  return user?.role === "admin";
}

export async function GET(req: NextRequest) {
  if (!(await isAdmin(req))) {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  const products = await prisma.product.findMany();
  return NextResponse.json({ products });
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin(req))) {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  const { name, price, image, description } = await req.json();

  if (!name || !price || !image || !description) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    const product = await prisma.product.create({
      data: { name, price, image, description },
    });

    return NextResponse.json({ product });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
