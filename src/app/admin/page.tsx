import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth-options";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user || user.role !== "admin") redirect("/");

  return (
    <main className="p-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-5xl font-extrabold text-center mb-12 text-blue-400">
        Admin Panel
      </h1>

      <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Orders Link */}
        <Link
          href="/admin/orders"
          className="flex flex-col items-center justify-center p-8 bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-shadow hover:bg-gray-700"
        >
          <span className="text-4xl mb-2">📦</span>
          <span className="font-semibold text-xl">Manage Orders</span>
        </Link>

        {/* Products Link */}
        <Link
          href="/admin/products"
          className="flex flex-col items-center justify-center p-8 bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-shadow hover:bg-gray-700"
        >
          <span className="text-4xl mb-2">🛒</span>
          <span className="font-semibold text-xl">Manage Products</span>
        </Link>
      </div>
    </main>
  );
}
