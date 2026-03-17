import { ProductDetailsPageContent } from "@/features/products/components/product-details-page-content";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const parsedId = Number(id);

  return <ProductDetailsPageContent id={parsedId} />;
}
