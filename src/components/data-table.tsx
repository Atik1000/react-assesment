"use client";

import { Table, TableProps } from "antd";

export function DataTable<T extends object>(props: TableProps<T>) {
  return <Table<T> rowKey="id" scroll={{ x: 960 }} {...props} />;
}
