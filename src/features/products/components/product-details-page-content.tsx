"use client";

import { App, Button } from "antd";
import Link from "next/link";
import { useState } from "react";
import { ErrorState } from "@/components/error-state";
import { LoadingSkeleton } from "@/components/loading-skeleton";
import { EditProductDrawer } from "@/features/products/components/edit-product-drawer";
import { ProductDetailsView } from "@/features/products/components/product-details-view";
import {
  useEditProductMutation,
  useProductDetailsQuery,
} from "@/features/products/hooks/use-products";
import { UpdateProductPayload } from "@/features/products/types/product.types";

interface ProductDetailsPageContentProps {
  id: number;
}

export function ProductDetailsPageContent({ id }: ProductDetailsPageContentProps) {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const productQuery = useProductDetailsQuery(id);
  const editMutation = useEditProductMutation(id);
  const { message } = App.useApp();

  if (productQuery.isPending) {
    return <LoadingSkeleton />;
  }

  if (productQuery.isError || !productQuery.data) {
    return (
      <ErrorState
        title="Unable to fetch product"
        description={productQuery.error?.message ?? "Product not found"}
        onRetry={() => productQuery.refetch()}
      />
    );
  }

  const handleSubmit = async (values: UpdateProductPayload) => {
    await editMutation.mutateAsync(values);
    message.success("Product update simulated successfully");
    setDrawerOpen(false);
  };

  return (
    <div className="space-y-5">
      <div>
        <Link href="/products">
          <Button>Back to Products</Button>
        </Link>
      </div>

      <ProductDetailsView product={productQuery.data} onEditClick={() => setDrawerOpen(true)} />

      <EditProductDrawer
        open={isDrawerOpen}
        product={productQuery.data}
        onClose={() => setDrawerOpen(false)}
        onSubmit={handleSubmit}
        submitting={editMutation.isPending}
      />
    </div>
  );
}
