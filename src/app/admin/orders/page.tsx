import { prisma } from "@/lib/prisma";
import UpdateOrderStatus from "./UpdateOrderStatus";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminOrdersPage() {
  const session = await auth();

  if (!session?.user?.email) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user || user.role !== "admin") redirect("/");

  const orders = await prisma.order.findMany({
    include: {
      items: {
        include: { product: true },
      },
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="p-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-400">
        All Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-gray-400 text-center text-lg">
          No orders have been placed yet.
        </p>
      ) : (
        <div className="space-y-6 max-w-5xl mx-auto">
          {orders.map((order) => {
            const total = order.items.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            );

            return (
              <div
                key={order.id}
                className="bg-gray-800 p-4 rounded-xl shadow-lg hover:shadow-2xl transition-shadow"
              >
                <div className="flex justify-between items-center mb-2">
                  <p className="font-semibold text-lg">
                    Order #{order.id} — {order.user.name} ({order.user.email})
                  </p>

                  <UpdateOrderStatus
                    orderId={order.id}
                    currentStatus={order.status}
                  />
                </div>

                <ul className="ml-4 list-disc space-y-1">
                  {order.items.map((item) => (
                    <li key={item.id} className="flex justify-between">
                      <span>{item.name}</span>
                      <span>
                        {item.quantity} × Rp {item.price.toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>

                <p className="mt-4 text-right font-bold text-lg text-blue-400">
                  Total: Rp {total.toFixed(2)}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
