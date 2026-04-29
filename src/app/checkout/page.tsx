import CheckoutClient from "./CheckoutClient";

async function getAddresses() {
  const res = await fetch("/api/addresses", {
    cache: "no-store",
  });

  if (!res.ok) return [];

  const data = await res.json();
  return data.addresses || [];
}

export default async function CheckoutPage() {
  return <CheckoutClient/>;
}