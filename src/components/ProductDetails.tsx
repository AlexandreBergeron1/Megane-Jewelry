
"use client";

import { useState } from "react";
import { products } from "@wix/stores";
import Accordion from "@/components/Accordion";
import ProductImages from "@/components/ProductImages";
import CustomizedProducts from "@/components/CustomizedProducts";

type Props = {
  productId: string;
  product: products.Product;
  items: any[];
  variants: products.Variant[];
  productOptions: products.ProductOption[];
  children?: React.ReactNode;
};

export default function ProductDetails({
  productId,
  product,
  items,
  variants,
  productOptions,
  children,
}: Props) {
  const [selectedColor, setSelectedColor] = useState("");

  return (
    <div className="flex flex-col lg:flex-row gap-16">
      {/* Left column: product images */}
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <ProductImages
          items={items}
          selectedColor={selectedColor}
        />
      </div>

      {/* Right column: product information and purchasing controls */}
      <div className="w-full lg:w-1/2 gap-8 flex flex-col">
        {children}

        <CustomizedProducts
          productId={productId}
          variants={variants}
          productOptions={productOptions}
          onColorChange={setSelectedColor}
        />

        <Accordion product={product} />
      </div>
    </div>
  );
}
