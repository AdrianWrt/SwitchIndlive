import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth-options";
import { prisma } from "@/lib/prisma";
import midtransClient from "midtrans-client";
import { Chau_Philomene_One } from "next/font/google";


export async function POST(req: NextRequest) {
  console.log("🔥 ORDER API KEPIKUL");
  const session = await getServerSession(authOptions);
  const body = await req.json();
  console.log("BODY:", body);

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
  console.log("➡️ MAU CREATE ORDER");

  // 🔥 1. HITUNG TOTAL
  const total = items.reduce(
    (sum: number, i: any) => sum + i.price * i.quantity,
    0
  );

  // 🔥 2. BUAT ORDER DULU (INI YANG KAMU KURANG)
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
            name: product.name,     // ✅ dari DB
            price: product.price,   // ✅ dari DB
            quantity: i.quantity,
          };
        }),
      },
    },
    include: { items: true },
  });
  

  // 🔥 3. BARU KE MIDTRANS
  const snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY!,
  });

  const address = await prisma.address.findUnique({
    where: { id: addressId },
  });

  const fullAddress = `${address.street}, ${address.city}, ${address.province}, ${address.postalCode}`;
  
  const midtrans = await snap.createTransaction({
    transaction_details: {
      order_id: order.id,
      gross_amount: total,
    },

    item_details: items.map((i: any) => {
      const product = products.find((p) => p.id === i.id);
  
      if (!product) {
        throw new Error("Product not found");
      }
  
      return {
        id: product.id,
        name: product.name,     // ✅ dari DB
        price: product.price,   // ✅ dari DB
        quantity: i.quantity,
      };
    }),
  
    customer_details: {
      first_name: user?.name || "Customer",
      email: user?.email,
    
      shipping_address: {
        first_name: address?.fullName,
        phone: address?.phone,
        address: fullAddress || "No address",
        city: "Jakarta",          // 🔥 wajib isi
        postal_code: "12345",     // 🔥 wajib isi
        country_code: "IDN",      // 🔥 wajib isi
      },
    }
  });


  console.log("MIDTRANS:", midtrans);
  
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
