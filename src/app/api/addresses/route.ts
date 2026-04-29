import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

async function getUser() {
  const session = await auth();
  if (!session?.user?.email) return null;

  return prisma.user.findUnique({
    where: { email: session.user.email },
  });
}

export async function GET() {
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const addresses = await prisma.address.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ addresses });
}

export async function POST(req: NextRequest) {
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const {
    label,
    fullName,
    phone,
    street,
    city,
    province,
    postalCode,
  } = await req.json();

  if (!label || !fullName || !phone || !street || !city || !province || !postalCode) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const address = await prisma.address.create({
    data: {
      userId: user.id,
      label,
      fullName,
      phone,
      street,
      city,
      province,
      postalCode,
    },
  });

  return NextResponse.json({ address });
}
