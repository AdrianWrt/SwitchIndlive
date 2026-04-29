"use client";

import Link from "next/link";
import UserMenu from "./UserMenu";
import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";

export default function Header() {
  const { items } = useCart();
  const { data: session } = useSession();
  

  return (
    <header className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md sticky top-0 z-50">
      <Link href="/" className="font-bold text-2xl text-blue-400 hover:text-blue-300 transition-colors">
        SwitchInd
      </Link>

      <nav className="flex items-center gap-6">
        <Link
          href="/products"
          className="hover:text-blue-300 transition-colors"
        >
          Products
        </Link>

        <Link
          href="/cart"
          className="relative flex items-center gap-1 hover:text-blue-300 transition-colors"
        >
          Cart
          {items.length > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold animate-pulse">
              {items.reduce((sum, i) => sum + i.quantity, 0)}
            </span>
          )}
        </Link>

        {session ? (
          <UserMenu />
        ) : (
          <Link
            href="/login"
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded font-semibold transition-colors shadow-md"
          >
            Login
          </Link>
        )}
      </nav>
    </header>
  );

  


}
