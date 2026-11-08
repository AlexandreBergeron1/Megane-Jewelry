"use client";

import { useState } from "react";
import ProductImages from "@/components/ProductImages";
import CustomizedProducts from "@/components/CustomizedProducts";
import Accordion from "@/components/Accordion";
import AddCart from "@/components/AddCart";
import { products } from "@wix/stores";

export function SinglePageClient({ product, filteredSimilarProducts }: any) {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedVariant, setSelectedVariant] = useState<products.Variant>();
  const [colorMedia, setColorMedia] = useState<any>(null);

  return (
    <div
      className="px-4 pt-4 pb-16 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative"
      style={{ maxWidth: "1700px", margin: "0 auto" }}
    >
      <div className="flex flex-col lg:flex-row gap-16">
        {/* Images */}
        <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
          <ProductImages 
            items={colorMedia?.items || product.media?.items || []}
            selectedColor={selectedColor}
            selectedVariant={selectedVariant}
          />
        </div>

        {/* Product Details */}
        <div className="w-full lg:w-1/2 flex flex-col gap-8">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <div
            className="text-gray-500"
            dangerouslySetInnerHTML={{
              __html: (product.description as string) || "",
            }}
          />

          {product.price?.price === product.price?.discountedPrice ? (
            <p className="text-gray-500 font-medium text-2xl">
              ${product.price?.price}
            </p>
          ) : (
            <div className="flex items-center gap-4">
              <p className="text-black font-medium text-2xl">
                ${product.price?.discountedPrice}
              </p>
              <p className="text-gray-500 line-through text-xl">
                ${product.price?.price}
              </p>
            </div>
          )}

          {product.stock?.inStock ? (
            product.variants && product.productOptions ? (
              <CustomizedProducts
                productId={product._id!}
                variants={product.variants}
                productOptions={product.productOptions}
                onColorChange={setSelectedColor}
                onVariantChange={setSelectedVariant}
                onColorMediaChange={setColorMedia}
              />
            ) : (
              <AddCart
                productId={product._id!}
                variantId="00000000-0000-0000-0000-000000000000"
                stockNumber={product.stock?.quantity || 0}
              />
            )
          ) : (
            <div className="text-red">Out of stock</div>
          )}

          <Accordion product={product} />
        </div>
      </div>
    </div>
  );
}