export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  console.log("PARAMS:", params);

  const id = params.id;

  if (!id) {
    console.log("ID TIDAK ADA!");
    return <div>Product ID missing</div>;
  }

  return <div>{id}</div>;
}