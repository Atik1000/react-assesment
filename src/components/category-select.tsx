"use client";

import { Select } from "antd";
import { ProductCategory } from "@/features/products/types/product.types";

interface CategorySelectProps {
  value: string;
  categories: ProductCategory[];
  onChange: (value: string) => void;
}

export function CategorySelect({ value, categories, onChange }: CategorySelectProps) {
  return (
    <Select
      className="w-full"
      size="large"
      value={value || undefined}
      placeholder="Filter by category"
      allowClear
      onChange={(nextValue) => onChange(nextValue ?? "")}
      options={categories.map((category) => ({
        value: category.slug,
        label: category.name,
      }))}
    />
  );
}
