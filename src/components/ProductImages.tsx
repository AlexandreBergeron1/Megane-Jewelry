"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { products } from "@wix/stores";
import { wixImage } from "@/lib/wixImage";

const ProductImages = ({
  items,
  selectedColor,
  selectedVariant,
}: {
  items: any[];
  selectedColor: string;
  selectedVariant?: products.Variant;
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [selectedColor, items]);

  // Preload the first few images
  useEffect(() => {
    items.slice(0, 4).forEach((item) => {
      const img = new window.Image();
      img.src = wixImage(item.image?.url, 1000, 1200);
    });
  }, [items]);

  if (!items?.length) return null;

  return (
    <div className="flex flex-col">
      <div className="h-[600px] relative">
        <Image
        src={wixImage(items[index]?.image?.url, 1000, 1200)}
        alt="product"
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        priority
        className="object-cover rounded-md"
/>
      </div>

      <div className="grid grid-cols-6 gap-x-4 gap-y-8 mt-8">
        {items.map((item: any, i: number) => (
          <div
            className="h-32 relative cursor-pointer"
            key={item._id}
            onClick={() => setIndex(i)}
          >
            <Image
              src={wixImage(item.image.url, 500, 500)}
              alt={item.title || "product"}
              width={150}
              height={150}
              className="object-cover rounded-md w-full h-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;