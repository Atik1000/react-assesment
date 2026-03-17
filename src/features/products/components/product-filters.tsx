"use client";

import { CategorySelect } from "@/components/category-select";
import { SearchInput } from "@/components/search-input";
import { ProductCategory } from "@/features/products/types/product.types";

interface ProductFiltersProps {
  searchTerm: string;
  selectedCategory: string;
  categories: ProductCategory[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

export function ProductFilters({
  searchTerm,
  selectedCategory,
  categories,
  onSearchChange,
  onCategoryChange,
}: ProductFiltersProps) {
  return (
    <div className="grid gap-4 md:grid-cols-[2fr,1fr]">
      <SearchInput value={searchTerm} onDebouncedChange={onSearchChange} />
      <CategorySelect
        value={selectedCategory}
        categories={categories}
        onChange={onCategoryChange}
      />
    </div>
  );
}
