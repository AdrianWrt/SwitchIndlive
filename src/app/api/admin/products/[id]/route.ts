import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function PATCH(
  req: Request,
  ctx: { params: { id: string } } | { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams =
      "then" in ctx.params ? await ctx.params : ctx.params;

    const { id } = resolvedParams;

    const { status } = await req.json();

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