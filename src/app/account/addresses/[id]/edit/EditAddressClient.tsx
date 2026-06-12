"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditAddressClient({
  id,
}: {
  id: string;
}) {
  const router = useRouter();

  const [form, setForm] = useState({
    label: "",
    fullName: "",
    phone: "",
    street: "",
    city: "",
    province: "",
    postalCode: "",
  });

  useEffect(() => {
    fetch(`/api/addresses/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setForm(data.address);
      });
  }, [id]);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    const res = await fetch(
      `/api/addresses/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(form),
      }
    );

    if (!res.ok) {
      alert("Failed to update");
      return;
    }

    alert("Address updated");

    router.push("/account/addresses");
  }

  return (
    <main className="p-8 max-w-3xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6">
        Edit Address
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-xl grid gap-4"
      >
        <input
          className="p-2 rounded bg-gray-900"
          value={form.label}
          onChange={(e) =>
            setForm({
              ...form,
              label: e.target.value,
            })
          }
        />

        <input
          className="p-2 rounded bg-gray-900"
          value={form.fullName}
          onChange={(e) =>
            setForm({
              ...form,
              fullName: e.target.value,
            })
          }
        />

        <input
          className="p-2 rounded bg-gray-900"
          value={form.phone}
          onChange={(e) =>
            setForm({
              ...form,
              phone: e.target.value,
            })
          }
        />

        <input
          className="p-2 rounded bg-gray-900"
          value={form.street}
          onChange={(e) =>
            setForm({
              ...form,
              street: e.target.value,
            })
          }
        />

        <input
          className="p-2 rounded bg-gray-900"
          value={form.city}
          onChange={(e) =>
            setForm({
              ...form,
              city: e.target.value,
            })
          }
        />

        <input
          className="p-2 rounded bg-gray-900"
          value={form.province}
          onChange={(e) =>
            setForm({
              ...form,
              province: e.target.value,
            })
          }
        />

        <input
          className="p-2 rounded bg-gray-900"
          value={form.postalCode}
          onChange={(e) =>
            setForm({
              ...form,
              postalCode: e.target.value,
            })
          }
        />

        <button className="bg-blue-500 hover:bg-blue-600 py-2 rounded">
          Save Changes
        </button>
      </form>
    </main>
  );
}