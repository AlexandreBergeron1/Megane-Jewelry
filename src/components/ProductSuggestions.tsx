"use client";

import Image from "next/image";
import Link from "next/link";

type ProductSuggestionsProps = {
  filteredSimilarProducts: any[];
};

export function ProductSuggestions({ filteredSimilarProducts }: ProductSuggestionsProps) {
  if (filteredSimilarProducts.length === 0) return null;


return (
  <div
    className="px-4 pt-4 pb-16 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative"
    style={{ maxWidth: "1700px", margin: "0 auto" }}
  >
    <h2 className="text-2xl font-bold mb-8">
      You may also like...
    </h2>

    <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-4 gap-y-8">
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
                  src={p.media?.mainMedia?.image?.url || "/product.png"}
                  alt={p.name || "Product"}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
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
                  sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  className="absolute rounded-md object-cover"
                />
              </div>

              <div className="flex flex-col justify-between gap-2">
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
                    {colorOption.choices.slice(0, 5).map((choice: any) => (
                      <li
                        key={choice.value}
                        className="w-3 h-3 rounded-full ring-1 ring-gray-300"
                        style={{ backgroundColor: choice.value }}
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
);
}

export default ProductSuggestions;