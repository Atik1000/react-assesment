"use client";

import { Input } from "antd";
import { SearchProps } from "antd/es/input/Search";
import { useEffect, useState } from "react";

interface SearchInputProps {
  value: string;
  onDebouncedChange: (value: string) => void;
  delay?: number;
  placeholder?: string;
}

export function SearchInput({
  value,
  onDebouncedChange,
  delay = 400,
  placeholder = "Search products",
}: SearchInputProps) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onDebouncedChange(localValue.trim());
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay, localValue, onDebouncedChange]);

  const handleSearch: SearchProps["onSearch"] = (nextValue) => {
    onDebouncedChange(nextValue.trim());
  };

  return (
    <Input.Search
      value={localValue}
      onChange={(event) => setLocalValue(event.target.value)}
      onSearch={handleSearch}
      placeholder={placeholder}
      allowClear
      enterButton
      size="large"
    />
  );
}
