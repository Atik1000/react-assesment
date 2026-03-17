import { apiClient } from "@/lib/api-client";
import {
  Product,
  ProductFilters,
  ProductsResponse,
  UpdateProductPayload,
} from "@/features/products/types/product.types";

const buildPaginationQuery = ({ page, limit }: Pick<ProductFilters, "page" | "limit">) => {
  const skip = Math.max(page - 1, 0) * limit;
  return { limit, skip };
};

export async function getProducts(filters: ProductFilters): Promise<ProductsResponse> {
  const { page, limit, search, category } = filters;
  const pagination = buildPaginationQuery({ page, limit });

  if (category) {
    return apiClient<ProductsResponse>(
      `/products/category/${encodeURIComponent(category)}`,
      {
        query: pagination,
      }
    );
  }

  if (search.trim()) {
    return apiClient<ProductsResponse>("/products/search", {
      query: {
        q: search.trim(),
        ...pagination,
      },
    });
  }

  return apiClient<ProductsResponse>("/products", {
    query: pagination,
  });
}

export async function getProductById(id: number): Promise<Product> {
  return apiClient<Product>(`/products/${id}`);
}

export async function getProductCategories(): Promise<string[]> {
  return apiClient<string[]>("/products/categories");
}

export async function mockUpdateProduct(payload: UpdateProductPayload): Promise<UpdateProductPayload> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(payload), 700);
  });
}
