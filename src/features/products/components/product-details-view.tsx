"use client";

import { Button, Carousel, Descriptions, Tag, Typography } from "antd";
import Image from "next/image";
import styled from "styled-components";
import { Product } from "@/features/products/types/product.types";

const HeaderPanel = styled.section`
  border-radius: 20px;
  background: linear-gradient(135deg, #eff7f2, #f8faf9);
  border: 1px solid #d9e7df;
  padding: 20px;
`;

interface ProductDetailsViewProps {
  product: Product;
  onEditClick: () => void;
}

export function ProductDetailsView({ product, onEditClick }: ProductDetailsViewProps) {
  return (
    <div className="space-y-6">
      <HeaderPanel>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <Typography.Title level={2} className="!mb-1 !font-heading">
              {product.title}
            </Typography.Title>
            <Typography.Paragraph type="secondary" className="!mb-0">
              {product.description}
            </Typography.Paragraph>
          </div>
          <Button type="primary" onClick={onEditClick}>
            Edit Product
          </Button>
        </div>
      </HeaderPanel>

      <div className="grid gap-6 lg:grid-cols-[1.2fr,1fr]">
        <section className="overflow-hidden rounded-2xl border border-[#dde7df] bg-white p-4 shadow-sm">
          <Carousel autoplay>
            {product.images.map((image, index) => (
              <div key={`${product.id}-${index}`}>
                <div className="relative h-[360px] w-full overflow-hidden rounded-xl bg-[#f5f8f6]">
                  <Image
                    src={image}
                    alt={`${product.title} image ${index + 1}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </Carousel>
        </section>

        <section className="rounded-2xl border border-[#dde7df] bg-white p-5 shadow-sm">
          <Descriptions title="Inventory" column={1} size="small">
            <Descriptions.Item label="Price">${product.price.toFixed(2)}</Descriptions.Item>
            <Descriptions.Item label="Rating">{product.rating}</Descriptions.Item>
            <Descriptions.Item label="Stock">{product.stock}</Descriptions.Item>
            <Descriptions.Item label="Category">
              <Tag color="green">{product.category}</Tag>
            </Descriptions.Item>
          </Descriptions>
        </section>
      </div>
    </div>
  );
}
