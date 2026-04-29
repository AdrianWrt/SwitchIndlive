"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function UserMenu() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  if (!session?.user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 flex items-center gap-2"
      >
        {session.user.name || session.user.email}
        <span className="text-xl">▾</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded shadow-lg z-10">
          <ul className="flex flex-col">
            <li>
              <Link
                href="/orders"
                className="block px-4 py-2 hover:bg-gray-700 text-white"
                onClick={() => setOpen(false)}
              >
                My Orders
              </Link>
            </li>
            <li>
                <Link
                href="/account/addresses"
                className="block px-4 py-2 hover:bg-gray-700 text-white"
                onClick={() => setOpen(false)}
                >
                    My Adresses
                </Link>
            </li>
            {session.user.role === "admin" && (
              <li>
                <Link
                  href="/admin"
                  className="block px-4 py-2 hover:bg-gray-700 text-white"
                  onClick={() => setOpen(false)}
                >
                  Admin Panel
                </Link>
              </li>
            )}
            <li>
              <button
                onClick={() => {
                  signOut();
                  setOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-700 text-white"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
