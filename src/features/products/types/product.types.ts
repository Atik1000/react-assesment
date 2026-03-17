export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  images: string[];
  thumbnail: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface ProductFilters {
  page: number;
  limit: number;
  search: string;
  category: string;
}

export interface UpdateProductPayload {
  title: string;
  price: number;
  stock: number;
  description: string;
}
