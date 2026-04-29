import CheckoutClient from "./CheckoutClient";

async function getAddresses() {
  const res = await fetch("http://localhost:3000/api/addresses", {
    cache: "no-store",
  });

  if (!res.ok) return [];

  const data = await res.json();
  return data.addresses || [];
}

export default async function CheckoutPage() {
  const addresses = await getAddresses();

  return <CheckoutClient addresses={addresses} />;
}