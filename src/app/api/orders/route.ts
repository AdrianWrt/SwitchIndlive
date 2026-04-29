import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import midtransClient from "midtrans-client";
import { Chau_Philomene_One } from "next/font/google";


export async function POST(req: NextRequest) {
  const session = await auth();
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

  const total = order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const fullAddress = `${address.label}, ${address.street}, ${address.city}, ${address.province}, ${address.postalCode}`;

  
  const midtrans = await snap.createTransaction({
    transaction_details: {
      order_id: order.id,
      gross_amount: total,
    },
    
    item_details: order.items.map((item) => ({
      id: item.productId,
      price: item.price,
      quantity: item.quantity,
      name: item.name || "Product",
    })),
  
    customer_details: {
      first_name: user?.name || "Customer",
      email: user?.email,
    
      shipping_address: {
        first_name: address?.fullName,
        phone: address?.phone,
        address: fullAddress || "No address",
      },
    },

    callbacks: {
      finish: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success`,
    },
  } as any);

  
  return NextResponse.json({
    redirect_url: midtrans.redirect_url,
  });

} catch (err: any) {
  console.error("❌ ERROR ORDER API:", err);

  return NextResponse.json(
    { error: err.message || "Internal Server Error" },
    { status: 500 }
  );
}
  
}
