"use client";

import { Card, Typography } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { ErrorState } from "@/components/error-state";
import { LoadingSkeleton } from "@/components/loading-skeleton";
import { ProductFilters } from "@/features/products/components/product-filters";
import { ProductsTable } from "@/features/products/components/products-table";
import {
  useCategoriesQuery,
  useProductsQuery,
} from "@/features/products/hooks/use-products";
import { useProductsFilterStore } from "@/features/products/store/products-filter.store";

function parsePositiveNumber(value: string | null, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export function ProductsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    searchTerm,
    selectedCategory,
    currentPage,
    pageSize,
    setSearchTerm,
    setSelectedCategory,
    setCurrentPage,
    setPageSize,
    hydrateFilters,
  } = useProductsFilterStore();

  const queryState = useMemo(
    () => ({
      page: parsePositiveNumber(searchParams.get("page"), currentPage),
      limit: parsePositiveNumber(searchParams.get("limit"), pageSize),
      search: searchParams.get("search") ?? "",
      category: searchParams.get("category") ?? "",
    }),
    [searchParams, currentPage, pageSize]
  );

  useEffect(() => {
    hydrateFilters({
      currentPage: queryState.page,
      pageSize: queryState.limit,
      searchTerm: queryState.search,
      selectedCategory: queryState.category,
    });
  }, [hydrateFilters, queryState]);

  useEffect(() => {
    const nextParams = new URLSearchParams();

    if (currentPage !== 1) {
      nextParams.set("page", String(currentPage));
    }

    if (pageSize !== 10) {
      nextParams.set("limit", String(pageSize));
    }

    if (searchTerm) {
      nextParams.set("search", searchTerm);
    }

    if (selectedCategory) {
      nextParams.set("category", selectedCategory);
    }

    const current = searchParams.toString();
    const next = nextParams.toString();

    if (current !== next) {
      router.replace(next ? `?${next}` : "?", { scroll: false });
    }
  }, [currentPage, pageSize, router, searchParams, searchTerm, selectedCategory]);

  const productsQuery = useProductsQuery({
    page: currentPage,
    limit: pageSize,
    search: searchTerm,
    category: selectedCategory,
  });

  const categoriesQuery = useCategoriesQuery();

  if (productsQuery.isPending) {
    return <LoadingSkeleton />;
  }

  if (productsQuery.isError) {
    return (
      <ErrorState
        title="Failed to load products"
        description={productsQuery.error.message}
        onRetry={() => productsQuery.refetch()}
      />
    );
  }

  return (
    <div className="space-y-5">
      <Card className="border-[#dbe6df] shadow-sm">
        <Typography.Title level={3} className="mb-1! font-heading!">
          Product Explorer
        </Typography.Title>
        <Typography.Paragraph type="secondary" className="mb-0!">
          Browse products with synchronized filters, pagination, and resilient caching.
        </Typography.Paragraph>
      </Card>

      <Card className="border-[#dbe6df] shadow-sm">
        <ProductFilters
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          categories={categoriesQuery.data ?? []}
          onSearchChange={setSearchTerm}
          onCategoryChange={setSelectedCategory}
        />
      </Card>

      <Card className="border-[#dbe6df] shadow-sm">
        <ProductsTable
          dataSource={productsQuery.data.products}
          total={productsQuery.data.total}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={(page, nextPageSize) => {
            setCurrentPage(page);
            if (nextPageSize !== pageSize) {
              setPageSize(nextPageSize);
            }
          }}
        />
      </Card>
    </div>
  );
}
