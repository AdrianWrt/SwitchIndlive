import { NextRequest, NextResponse } from "next/server";
import midtransClient from "midtrans-client";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Not authenticated" },
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

    const { items } = body;

    if (!items || !Array.isArray(items)) {
      return NextResponse.json(
        { error: "Invalid items" },
        { status: 400 }
      );
    }

    const rawTotal = items.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0
    );

    const total = Math.max(1, Math.round(rawTotal));

    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY!,
      clientKey: process.env.MIDTRANS_CLIENT_KEY!,
    });

    const transaction = {
      transaction_details: {
        order_id: `ORDER-${Date.now()}`,
        gross_amount: total,
      },
      item_details: items.map((item: any) => ({
        id: item.id.toString(),
        price: item.price,
        quantity: item.quantity,
        name: item.name,
      })),
      credit_card: { secure: true },
      customer_details: {
        first_name: session.user.name || "Customer",
        email: session.user.email,
      },
      finish_redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL}/orders`,
    };

    const paymentResponse = await snap.createTransaction(transaction);

    return NextResponse.json(paymentResponse);
  } catch (err: any) {
    console.error("PAYMENT ERROR:", err);
    return NextResponse.json(
      { error: err.message || "Payment failed" },
      { status: 500 }
    );
  }
}