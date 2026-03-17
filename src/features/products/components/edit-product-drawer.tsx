"use client";

import { Button, Drawer, Form, Input, InputNumber } from "antd";
import { useEffect } from "react";
import { Product, UpdateProductPayload } from "@/features/products/types/product.types";

interface EditProductDrawerProps {
  open: boolean;
  product: Product;
  submitting: boolean;
  onClose: () => void;
  onSubmit: (values: UpdateProductPayload) => void;
}

export function EditProductDrawer({
  open,
  product,
  submitting,
  onClose,
  onSubmit,
}: EditProductDrawerProps) {
  const [form] = Form.useForm<UpdateProductPayload>();

  useEffect(() => {
    if (open) {
      form.setFieldsValue({
        title: product.title,
        price: product.price,
        stock: product.stock,
        description: product.description,
      });
    }
  }, [form, open, product]);

  return (
    <Drawer
      title="Edit Product"
      size={480}
      open={open}
      onClose={onClose}
      destroyOnClose
      extra={
        <Button type="primary" loading={submitting} onClick={() => form.submit()}>
          Save
        </Button>
      }
    >
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <Form.Item
          label="Title"
          name="title"
          rules={[
            { required: true, message: "Title is required" },
            {
              validator: async (_, value: string) => {
                if (value && value.trim().length < 3) {
                  throw new Error("Title must be at least 3 characters");
                }
              },
            },
          ]}
        >
          <Input placeholder="Product title" />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[
            { required: true, message: "Price is required" },
            {
              validator: async (_, value: number) => {
                if (value <= 0) {
                  throw new Error("Price must be greater than 0");
                }
              },
            },
          ]}
        >
          <InputNumber className="w-full" min={0.01} step={0.01} />
        </Form.Item>

        <Form.Item
          label="Stock"
          name="stock"
          rules={[
            { required: true, message: "Stock is required" },
            {
              validator: async (_, value: number) => {
                if (value < 0) {
                  throw new Error("Stock must be at least 0");
                }
              },
            },
          ]}
        >
          <InputNumber className="w-full" min={0} />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            { required: true, message: "Description is required" },
            {
              validator: async (_, value: string) => {
                if (value && value.trim().length < 10) {
                  throw new Error("Description must be at least 10 characters");
                }
              },
            },
          ]}
        >
          <Input.TextArea rows={5} showCount maxLength={400} />
        </Form.Item>
      </Form>
    </Drawer>
  );
}
