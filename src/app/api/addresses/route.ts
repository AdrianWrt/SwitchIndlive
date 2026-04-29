import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth-options";
import { auth } from "@/auth";


async function getUser() {
  const session = await auth();

  if (!session?.user?.email) return null;

  return prisma.user.findUnique({
    where: { email: session.user.email },
  });
}

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  try {
    const user = await getUser();

    if (!user) {
      return NextResponse.json({ addresses: [] }); 
    }

    const addresses = await prisma.address.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ addresses });
  } catch (error) {
    console.error("ADDRESSES ERROR:", error);
    return NextResponse.json({ addresses: [] });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid body" },
        { status: 400 }
      );
    }

    const {
      label,
      fullName,
      phone,
      street,
      city,
      province,
      postalCode,
    } = body || {};

    if (
      !label ||
      !fullName ||
      !phone ||
      !street ||
      !city ||
      !province ||
      !postalCode
    ) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
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

  } catch (error) {
    console.error("POST ADDRESS ERROR:", error);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}