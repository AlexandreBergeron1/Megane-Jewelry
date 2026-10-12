"use client";

import { useRouter, useSearchParams } from "next/navigation";

type Category = {
    id: string;
    name: string;
    slug: string;
};

type Props = {
    typeParents: Category[];
    necklaceChildren: Category[];
    braceletChildren: Category[];
    colors: Category[];
};

const CategoriesClient = ({ typeParents, necklaceChildren, braceletChildren, colors }: Props) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const selectedCatSlug = searchParams.get("cat");

    const handleTypeSelect = (slug: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("cat", slug);
        params.delete("subcat");
        router.push(`?${params.toString()}`);
    };

    const handleSubtypeSelect = (slug: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("subcat", slug);
        router.push(`?${params.toString()}`);
    };

    const showNecklaceSubtype = selectedCatSlug === "neckclace"; // your slug from Wix
    const showBraceletSubtype = selectedCatSlug === "bracelet";

    return (
        <div className="hidden flex-col w-[150px] gap-10 sm:flex">

            {/* Type */}
            <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold">Type</h3>
                {/* All Products option */}
            <div>
            <input
                type="radio"
                name="type"
                id="all"
                className="hidden peer"
                onChange={() => {
                const params = new URLSearchParams(searchParams.toString());
                params.delete("cat");
                params.delete("subcat");
                router.push(`?${params.toString()}`);
                }}
                checked={selectedCatSlug === null}
                />
                <label htmlFor="all" className="cursor-pointer peer-checked:font-bold">
                    All Products
                </label>
                 </div>
                {typeParents.map((category) => (
                    <div key={category.id}>
                        <input
                            type="radio"
                            name="type"
                            id={category.id}
                            className="hidden peer"
                            onChange={() => handleTypeSelect(category.slug)}
                            checked={selectedCatSlug === category.slug}
                        />
                        <label htmlFor={category.id} className="cursor-pointer peer-checked:font-bold">
                            {category.name}
                        </label>
                    </div>
                ))}
            </div>

            {/* Necklace Subtype */}
            {showNecklaceSubtype && (
                <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-bold">Necklace Subtype</h3>
                    {necklaceChildren.map((category) => (
                        <div key={category.id}>
                            <input
                                type="radio"
                                name="subtype"
                                id={category.id}
                                className="hidden peer"
                                onChange={() => handleSubtypeSelect(category.slug)}
                                checked={searchParams.get("subcat") === category.slug}
                            />
                            <label htmlFor={category.id} className="cursor-pointer peer-checked:font-bold">
                                {category.name}
                            </label>
                        </div>
                    ))}
                </div>
            )}

            {/* Bracelet Subtype */}
            {showBraceletSubtype && (
                <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-bold">Bracelet Subtype</h3>
                    {braceletChildren.map((category) => (
                        <div key={category.id}>
                            <input
                                type="radio"
                                name="subtype"
                                id={category.id}
                                className="hidden peer"
                                onChange={() => handleSubtypeSelect(category.slug)}
                                checked={searchParams.get("subcat") === category.slug}
                            />
                            <label htmlFor={category.id} className="cursor-pointer peer-checked:font-bold">
                                {category.name}
                            </label>
                        </div>
                    ))}
                </div>
            )}

            {/* Color */}
            <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold">Color</h3>
                {colors.map((color) => (
                    <div key={color.id}>
                        <input
                            type="radio"
                            name="color"
                            id={color.id}
                            className="hidden peer"
                            onChange={() => {
                                const params = new URLSearchParams(searchParams.toString());
                                params.set("color", color.slug);
                                router.push(`?${params.toString()}`);
                            }}
                            checked={searchParams.get("color") === color.slug}
                        />
                        <label htmlFor={color.id} className="cursor-pointer peer-checked:font-bold">
                            {color.name}
                        </label>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default CategoriesClient;