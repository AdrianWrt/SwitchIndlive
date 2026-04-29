import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function PATCH(
  req: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await ctx.params;

    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid body" },
        { status: 400 }
      );
    }

    const { status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: "Missing orderId or status" },
        { status: 400 }
      );
    }

    await prisma.order.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("PATCH ORDER ERROR:", e);

    return NextResponse.json(
      { error: "Failed to update status" },
      { status: 500 }
    );
  }
}