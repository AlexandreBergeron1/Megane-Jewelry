"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Pagination from "./Pagination";
import { Suspense } from "react";

const ProductCard = ({ p, availability }: { p: any; availability?: string }) => {
    const searchParams = useSearchParams();
    const selectedColorFromUrl = searchParams.get("color");
    
    const [selectedColorMedia, setSelectedColorMedia] = useState<any>(null);
    const [selectedColorIndex, setSelectedColorIndex] = useState(0);
    const [selectedColorChoice, setSelectedColorChoice] = useState<any>(null);
    
    const colorOption = p.productOptions?.find((opt: any) => opt.name === "Color");
    const displayImages = selectedColorMedia?.items || p.media?.items || [];
    const mainImage = displayImages[selectedColorIndex];

    // Auto-select color when URL color param changes
    useEffect(() => {
        if (selectedColorFromUrl && colorOption?.choices) {
            // Find the color choice that matches the URL param (case-insensitive)
            const matchingChoice = colorOption.choices.find((choice: any) =>
                choice.description?.toLowerCase() === selectedColorFromUrl.toLowerCase()
            );
            
            if (matchingChoice) {
                handleColorClick(matchingChoice);
            }
        }
    }, [selectedColorFromUrl, colorOption]);

    const handleColorClick = (choice: any) => {
        if (choice.media?.items) {
            setSelectedColorMedia(choice.media);
            setSelectedColorIndex(0);
            setSelectedColorChoice(choice);
        }
    };

    return (
        <div key={p._id}>
            <Link href={"/" + p.slug} className="flex flex-col gap-4" style={availability !== "out_of_stock" && !p.stock?.inStock ? { opacity: 0.5 } : {}}>
                <div className="relative w-full xl:h-[250px] h-[200px] p-3 rounded-md">
                    {!p.stock?.inStock && (
                        <div className="absolute px-3 py-1 bg-black rounded-full text-white font-normal text-sm z-20">
                            Sold out
                        </div>
                    )}
                    <Image
                        src={mainImage?.image?.url || p.media?.mainMedia?.image?.url || "/product.png"}
                        alt={p.name}
                        fill
                        sizes="25vw"
                        className="absolute rounded-md object-cover z-10 hover:opacity-0 transition-opacity ease duration-500"
                    />
                    <Image
                        src={displayImages[1]?.image?.url || p.media?.items?.[1]?.image?.url || p.media?.mainMedia?.image?.url || "/product.png"}
                        alt={p.name}
                        fill
                        sizes="25vw"
                        className="absolute rounded-md object-cover"
                    />
                </div>
                <div className="flex-col justify-between gap-2">
                    <h3 className="text-[21px]/7 font-semibold">{p.name}</h3>
                    <p className="p-1 text-md">${p.price?.price}.00</p>
                </div>
            </Link>

            {colorOption && colorOption.choices && colorOption.choices.length > 0 && (
                <div className="flex items-center gap-2 mt-2">
                    <ul className="flex items-center gap-2">
                        {colorOption.choices.slice(0, 8).map((choice: any) => (
                            <li
                                key={choice.value}
                                className="w-3 h-3 rounded-full ring-1 ring-gray-300 cursor-pointer hover:ring-gray-400 transition-all relative"
                                style={{ backgroundColor: choice.value }}
                                title={choice.description}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleColorClick(choice);
                                }}
                            >
                                {selectedColorChoice?.value === choice.value && (
                                    <div className="absolute w-3 h-3 rounded-full ring-2 ring-blue-500 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

const ProductListClient = ({ products, hasNext, hasPrev, totalCount, limit, availability }: {
    products: any[];
    hasNext: boolean;
    hasPrev: boolean;
    totalCount: number;
    limit: number;
    availability?: string;
    categoryId?: string;
}) => {
    return (
        <div className="flex flex-1 flex-col">
            {products.length === 0 ? (
                <div className="mt-20 flex justify-center items-center h-96">
                    <div className="text-center">
                        <h2 className="text-lg text-black-500">No products found</h2>
                        <p className="text-sm text-black-400 mt-2">Try adjusting your filters or search for all products</p>
                    </div>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-2 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 gap-x-4 gap-y-8 mt-20">
                        {products.map((p) => (
                            <ProductCard key={p._id} p={p} availability={availability} />
                        ))}
                    </div>
                    {totalCount > limit && (
                        <Suspense fallback={null}>
                            <Pagination 
                                hasNext={hasNext} 
                                hasPrev={hasPrev} 
                                totalCount={totalCount}
                                limit={limit} 
                            />
                        </Suspense>
                    )}
                </>
            )}
        </div>
    );
};

export default ProductListClient;