import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

interface CartItem {
  id: string;
  quantity: number;
}

export async function placeOrder(addressId : string, cartItems: CartItem[]) {
  const session = await auth();
  if (!session?.user?.email) throw new Error("Not authenticated");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) throw new Error("User not found");

  if (!cartItems || cartItems.length === 0) {
    throw new Error("Cart is empty");
  }

  const products = await prisma.product.findMany({
    where: {
      id: { in: cartItems.map((item) => item.id) },
    },
  });

  if (products.length !== cartItems.length) {
    throw new Error("Some products not found");
  }

  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    throw new Error("cartItems is empty or invalid");
  }

  const order = await prisma.order.create({
    data: {
      userId: user.id,
      status: "Pending",
      addressId,
      items: {
        create: cartItems.map((item) => {
          const product = products.find((p) => p.id === item.id);
  
          if (!product) {
            throw new Error(`Product not found for id: ${item.id}`);
          }
  
          return {
            productId: product.id,
            quantity: item.quantity,
            name: product.name,
            price: product.price,
          };
        }),
      },
    },
    include: { items: true, user: true },
  });
  

  return order;
}
