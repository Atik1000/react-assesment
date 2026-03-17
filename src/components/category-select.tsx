"use client";

import { Select } from "antd";

interface CategorySelectProps {
  value: string;
  categories: string[];
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
        value: category,
        label: category,
      }))}
    />
  );
}
