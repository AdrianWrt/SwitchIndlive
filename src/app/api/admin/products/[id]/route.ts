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

function getIdFromUrl(req: NextRequest) {
  const parts = req.nextUrl.pathname.split("/");
  return parts[parts.length - 1];
}

export async function PUT(req: NextRequest) {
  const id = getIdFromUrl(req);
  if (!id)
    return NextResponse.json({ error: "Missing product id" }, { status: 400 });

  if (!(await isAdmin(req)))
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });

  const { name, price, description } = await req.json();

  if (!name || !price || !description)
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  try {
    const product = await prisma.product.update({
      where: { id },
      data: { name, price, description },
    });

    return NextResponse.json({ product });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}


export async function DELETE(req: NextRequest) {
  const id = getIdFromUrl(req);
  if (!id) return NextResponse.json({ error: "Missing product id" }, { status: 400 });

  if (!(await isAdmin(req))) return NextResponse.json({ error: "Not authorized" }, { status: 403 });

  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ message: "Deleted" });
}
