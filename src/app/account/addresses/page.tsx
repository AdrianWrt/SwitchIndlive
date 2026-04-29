"use client";

import { useEffect, useState } from "react";

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

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    label: "",
    fullName: "",
    phone: "",
    street: "",
    city: "",
    province: "",
    postalCode: "",
  });

  async function fetchAddresses() {
    setLoading(true);
    const res = await fetch("/api/addresses");
    if (res.ok) {
      const data = await res.json();
      setAddresses(data.addresses);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchAddresses();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/addresses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const data = await res.json();
      alert(data.error || "Failed to add address");
      return;
    }

    setForm({
      label: "",
      fullName: "",
      phone: "",
      street: "",
      city: "",
      province: "",
      postalCode: "",
    });

    fetchAddresses();
  }

  return (
    <main className="p-8 max-w-3xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6">My Addresses</h1>

      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-xl mb-8 grid grid-cols-1 gap-4">
        <input className="p-2 rounded bg-gray-900" placeholder="Label (Home, Office)" value={form.label} onChange={e => setForm({ ...form, label: e.target.value })} />
        <input className="p-2 rounded bg-gray-900" placeholder="Full Name" value={form.fullName} onChange={e => setForm({ ...form, fullName: e.target.value })} />
        <input className="p-2 rounded bg-gray-900" placeholder="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
        <input className="p-2 rounded bg-gray-900" placeholder="Street" value={form.street} onChange={e => setForm({ ...form, street: e.target.value })} />
        <input className="p-2 rounded bg-gray-900" placeholder="City" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} />
        <input className="p-2 rounded bg-gray-900" placeholder="Province" value={form.province} onChange={e => setForm({ ...form, province: e.target.value })} />
        <input className="p-2 rounded bg-gray-900" placeholder="Postal Code" value={form.postalCode} onChange={e => setForm({ ...form, postalCode: e.target.value })} />

        <button className="bg-blue-500 hover:bg-blue-600 py-2 rounded font-semibold">
          Add Address
        </button>
      </form>

      {loading ? (
        <p>Loading…</p>
      ) : (
        <div className="space-y-4">
          {addresses.map(a => (
            <div key={a.id} className="border border-gray-700 p-4 rounded-lg bg-gray-900">
              <p className="font-semibold">{a.label}</p>
              <p>{a.fullName}</p>
              <p>{a.street}, {a.city}</p>
              <p>{a.province} {a.postalCode}</p>
              <p>{a.phone}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
