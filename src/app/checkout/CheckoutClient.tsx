"use client"

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { placeOrder } from "./actions";

type Address = {
  id: string;
  label: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
};

export default function CheckoutClient() {
  const { items, clearCart } = useCart();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [addressId, setAddressId] = useState("");

  useEffect(() => {
    fetch("/api/addresses")
      .then((r) => r.json())
      .then((d) => setAddresses(d.addresses || []))
      .finally(() => setLoading(false));
  }, []);

  async function handleCheckout() {
    if (!selectedAddress) {
      alert("Please select a shipping address.");
      return;
    }

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        addressId: selectedAddress,
        items: items.map((i) => ({
          id: i.id,
          price: i.price,
          quantity: i.quantity,
        })),
      }),
    });


    if (!res.ok) {
      const text = await res.text();
      alert(text || "Checkout failed");
      return;
    }

    const data = await res.json();
    console.log("ORDER RESPONSE:", data);
    clearCart();
    console.log("MIDTRANS URL:", data.redirect_url);

    window.location.href = data.redirect_url;

    if (!data.redirect_url) {
      alert("Payment URL not found");
      console.log(data);
      return;
    }
  }

  

  return (
    <main className="p-8 max-w-3xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Shipping Address</h2>

        {loading ? (
          <p>Loading addresses…</p>
        ) : addresses.length === 0 ? (
          <p>
            You have no saved addresses.  
            <a href="/account/addresses" className="text-blue-400 underline ml-1">
              Add one here
            </a>
          </p>
        ) : (
          <div className="space-y-3">
            {addresses.map((a) => (
              <label
                key={a.id}
                className={`block border p-3 rounded cursor-pointer ${
                  selectedAddress === a.id
                    ? "border-blue-500 bg-gray-800"
                    : "border-gray-700"
                }`}
              >
                <input
                  type="radio"
                  name="address"
                  className="mr-2"
                  checked={selectedAddress === a.id}
                  onChange={() => setSelectedAddress(a.id)}
                />
                <span className="font-semibold">{a.label}</span>
                <div className="text-sm text-gray-300">
                  {a.fullName} – {a.phone}
                  <br />
                  {a.street}, {a.city}, {a.province} {a.postalCode}
                </div>
              </label>
            ))}
          </div>
        )}
      </section>

      <button
        onClick={handleCheckout}
        className="w-full bg-blue-500 hover:bg-blue-600 py-3 rounded-lg font-semibold"
      >
        Place Order
      </button>
    </main>
  );

}
