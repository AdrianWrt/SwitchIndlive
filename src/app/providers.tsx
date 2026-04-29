"use client";

import { ReactNode } from "react";
import { CartProvider } from "@/context/CartContext";
import { SessionProvider } from "next-auth/react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </SessionProvider>
  );
}
