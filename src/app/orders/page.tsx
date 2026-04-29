import { getServerSession } from "next-auth";
import { authOptions } from "@/auth-options";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  const orders = await prisma.order.findMany({
    where: {
      user: { email: session.user.email },
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="p-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-400">
        Your Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-gray-400 text-center text-lg">
          You haven’t placed any orders yet.
        </p>
      ) : (
        <div className="space-y-6 max-w-4xl mx-auto">
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
                  <p className="font-semibold text-lg">Order #{order.id}</p>
                  <p
                    className={`font-semibold px-2 py-1 rounded text-sm ${
                      order.status === "Pending"
                        ? "bg-yellow-500 text-black"
                        : order.status === "Paid"
                        ? "bg-green-500 text-black"
                        : order.status === "Shipped"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-500 text-white"
                    }`}
                  >
                    {order.status}
                  </p>
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
