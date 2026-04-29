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

export async function PUT(
  req: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await ctx.params;

    if (!id) {
      return NextResponse.json({ error: "Missing product id" }, { status: 400 });
    }

    if (!(await isAdmin())) {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 });
    }

    const { name, price, description } = await req.json();

    if (!name || !price || !description) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const product = await prisma.product.update({
      where: { id },
      data: { name, price, description },
    });

    return NextResponse.json({ product });
  } catch (err) {
    console.error("PUT PRODUCT ERROR:", err);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await ctx.params;

    if (!id) {
      return NextResponse.json({ error: "Missing product id" }, { status: 400 });
    }

    if (!(await isAdmin())) {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 });
    }

    await prisma.product.delete({ where: { id } });

    return NextResponse.json({ message: "Deleted" });
  } catch (err) {
    console.error("DELETE PRODUCT ERROR:", err);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}