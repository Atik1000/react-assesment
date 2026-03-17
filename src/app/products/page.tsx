import { Suspense } from "react";
import { LoadingSkeleton } from "@/components/loading-skeleton";
import { ProductsPageContent } from "@/features/products/components/products-page-content";

export default function ProductsPage() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <ProductsPageContent />
    </Suspense>
  );
}
