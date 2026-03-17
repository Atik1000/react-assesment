"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getProductById,
  getProductCategories,
  getProducts,
  mockUpdateProduct,
} from "@/features/products/services/products.service";
import {
  Product,
  ProductFilters,
  ProductsResponse,
  UpdateProductPayload,
} from "@/features/products/types/product.types";

export const productQueryKeys = {
  all: ["products"] as const,
  list: (filters: ProductFilters) => [...productQueryKeys.all, "list", filters] as const,
  detail: (id: number) => [...productQueryKeys.all, "detail", id] as const,
  categories: () => [...productQueryKeys.all, "categories"] as const,
};

export function useProductsQuery(filters: ProductFilters) {
  return useQuery<ProductsResponse>({
    queryKey: productQueryKeys.list(filters),
    queryFn: () => getProducts(filters),
    placeholderData: (previous) => previous,
  });
}

export function useCategoriesQuery() {
  return useQuery<string[]>({
    queryKey: productQueryKeys.categories(),
    queryFn: getProductCategories,
  });
}

export function useProductDetailsQuery(id: number) {
  return useQuery<Product>({
    queryKey: productQueryKeys.detail(id),
    queryFn: () => getProductById(id),
    enabled: Number.isFinite(id),
  });
}

export function useEditProductMutation(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateProductPayload) => mockUpdateProduct(payload),
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: productQueryKeys.detail(id) });

      const previousProduct = queryClient.getQueryData<Product>(
        productQueryKeys.detail(id)
      );

      if (previousProduct) {
        queryClient.setQueryData<Product>(productQueryKeys.detail(id), {
          ...previousProduct,
          ...payload,
        });
      }

      return { previousProduct };
    },
    onError: (_error, _payload, context) => {
      if (context?.previousProduct) {
        queryClient.setQueryData(productQueryKeys.detail(id), context.previousProduct);
      }
    },
  });
}
