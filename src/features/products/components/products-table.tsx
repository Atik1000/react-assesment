"use client";

import { Button, TableProps } from "antd";
import Link from "next/link";
import { DataTable } from "@/components/data-table";
import { Product } from "@/features/products/types/product.types";

interface ProductsTableProps {
  dataSource: Product[];
  currentPage: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number, pageSize: number) => void;
}

export function ProductsTable({
  dataSource,
  currentPage,
  pageSize,
  total,
  onPageChange,
}: ProductsTableProps) {
  const columns: TableProps<Product>["columns"] = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      ellipsis: true,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (value: number) => `$${value.toFixed(2)}`,
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      responsive: ["md"],
    },
    {
      title: "Action",
      key: "action",
      render: (_, product) => (
        <Link href={`/products/${product.id}`}>
          <Button type="primary">View</Button>
        </Link>
      ),
    },
  ];

  return (
    <DataTable<Product>
      columns={columns}
      dataSource={dataSource}
      pagination={{
        current: currentPage,
        pageSize,
        total,
        showSizeChanger: true,
        showTotal: (count) => `${count} items`,
        onChange: onPageChange,
      }}
    />
  );
}
