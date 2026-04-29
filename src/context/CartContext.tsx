"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      setItems(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      const qty = Number(item.quantity) || 1;

      if (existing) {
        return prev.map((i) =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + qty }
            : i
        );
      }

      return [...prev, { ...item, quantity: qty }];
    });
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  const increase = (id: string) => {
    setItems((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, quantity: p.quantity + 1 } : p
      )
    );
  };

  const decrease = (id: string) => {
    setItems((prev) =>
      prev
        .map((p) =>
          p.id === id ? { ...p, quantity: Math.max(p.quantity - 1, 1) } : p
        )
        .filter((p) => p.quantity > 0)
    );
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, increase, decrease, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
