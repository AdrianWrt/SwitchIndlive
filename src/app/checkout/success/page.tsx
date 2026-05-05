import Link from "next/link";

export default function CheckoutSuccess() {
  return (
    <main className="p-8 bg-gray-900 text-center">
      <h1 className="text-3xl font-bold mb-4 text-green-500">Payment Successful!</h1>
      <p className="mb-6">Thank you for your order. You can view it in your orders page.</p>
      <Link href="/orders" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded transition">
        View Orders
      </Link>
    </main>
  );
}
