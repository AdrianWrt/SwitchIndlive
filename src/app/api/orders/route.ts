import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth-options";
import { prisma } from "@/lib/prisma";
import midtransClient from "midtrans-client";
import { Chau_Philomene_One } from "next/font/google";


export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const body = await req.json();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { addressId, items } = body;

  if (!items || items.length === 0) {
    return NextResponse.json({ error: "Cart empty" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  const productIds = items.map((i: any) => i.id);

  const products = await prisma.product.findMany({
  where: {
    id: { in: productIds },
    },
  });

  try {
  const total = items.reduce(
    (sum: number, i: any) => sum + i.price * i.quantity,
    0
  );

  const order = await prisma.order.create({
    data: {
      userId: user!.id,
      addressId,
      status: "Pending",
      items: {
        create: items.map((i: any) => {
          const product = products.find((p) => p.id === i.id);
      
          if (!product) {
            throw new Error("Product not found");
          }
      
          return {
            productId: product.id,
            name: product.name,   
            price: product.price,  
            quantity: i.quantity,
          };
        }),
      },
    },
    include: { items: true },
  });
  

  const snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY!,
    clientKey: process.env.MIDTRANS_CLIENT_KEY!,
  });

  const address = await prisma.address.findUnique({
    where: { id: addressId },
  });

  if (!address) {
    return NextResponse.json(
      { error: "Address not found" },
      { status: 404 }
    );
  }

  const fullAddress = `${address.street}, ${address.city}, ${address.province}, ${address.postalCode}`;

  
  const midtrans = await snap.createTransaction({
    transaction_details: {
      order_id: order.id,
      gross_amount: Math.max(1, total),
    },

    item_details: items.map((i: any) => ({
      id: i.id,
      price: i.price,
      quantity: i.quantity,
      name: i.name,
    })),
  
    customer_details: {
      first_name: user?.name || "Customer",
      email: user?.email,
    
      shipping_address: {
        first_name: address?.fullName,
        phone: address?.phone,
        address: fullAddress || "No address",
      },
    }
  } as any);

  
  return NextResponse.json({
    redirect_url: midtrans.redirect_url,
  });

} catch (err) {
  console.error("❌ ERROR ORDER API:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
}
  
}
