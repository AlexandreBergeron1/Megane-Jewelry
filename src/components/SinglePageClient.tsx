"use client";

import { useState } from "react";
import ProductImages from "@/components/ProductImages";
import CustomizedProducts from "@/components/CustomizedProducts";
import Accordion from "@/components/Accordion";
import AddCart from "@/components/AddCart";
import Image from "next/image";
import Link from "next/link";
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

      {/* You May Also Like */}
      {filteredSimilarProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">You may also like...</h2>

          <div className="grid grid-cols-2 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 gap-x-4 gap-y-8">
            {filteredSimilarProducts.map((p: any) => {
              const colorOption = p.productOptions?.find(
                (opt: any) => opt.name === "Color"
              );

              return (
                <div key={p._id}>
                  <Link href={"/" + p.slug} className="flex flex-col gap-4">
                    <div className="relative w-full xl:h-[350px] h-[300px] p-3 rounded-md">
                      {!p.stock?.inStock && (
                        <div className="absolute px-3 py-1 bg-black rounded-full text-white font-normal text-sm z-20">
                          Sold out
                        </div>
                      )}

                      <Image
                        src={
                          p.media?.mainMedia?.image?.url ||
                          "/product.png"
                        }
                        alt={p.name || "Product"}
                        fill
                        sizes="25vw"
                        className="absolute rounded-md object-cover z-10 hover:opacity-0 transition-opacity ease duration-500"
                      />

                      <Image
                        src={
                          p.media?.items?.[1]?.image?.url ||
                          p.media?.mainMedia?.image?.url ||
                          "/product.png"
                        }
                        alt={p.name || "Product"}
                        fill
                        sizes="25vw"
                        className="absolute rounded-md object-cover"
                      />
                    </div>

                    <div className="flex-col justify-between gap-2">
                      <h3 className="text-[21px]/7 font-semibold">
                        {p.name}
                      </h3>
                      <p className="p-1 text-md">
                        ${p.price?.price}.00
                      </p>
                    </div>
                  </Link>

                  {colorOption?.choices &&
                    colorOption.choices.length > 0 && (
                      <div className="flex items-center gap-2 mt-2">
                        <ul className="flex items-center gap-2">
                          {colorOption.choices
                            .slice(0, 5)
                            .map((choice: any) => (
                              <li
                                key={choice.value}
                                className="w-3 h-3 rounded-full ring-1 ring-gray-300"
                                style={{
                                  backgroundColor: choice.value,
                                }}
                                title={choice.description}
                              />
                            ))}
                        </ul>
                      </div>
                    )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}