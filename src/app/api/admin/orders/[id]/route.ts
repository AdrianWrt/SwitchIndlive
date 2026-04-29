import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function PATCH(
  req: Request,
  ctx: { params: { id: string } }
) {
  try {
    const { id } = ctx.params;
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