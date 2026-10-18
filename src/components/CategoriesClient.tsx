"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

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

    const handleAllSubtypes = (parentSlug: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("cat", parentSlug);
        params.delete("subcat");
        params.delete("page");
        router.push(`?${params.toString()}`);
    };

    const handleColorSelect = (slug: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("color", slug);
        params.delete("page"); // RESET PAGE
        router.push(`?${params.toString()}`);
    };

    const handleRemoveColor = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("color");
        params.delete("page"); // RESET PAGE
        router.push(`?${params.toString()}`);
    };

    const showNecklaceSubtype = selectedCatSlug === "neckclace";
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

        {/* All Necklaces option */}
        <div>
            <input
                type="radio"
                name="subtype"
                id="all-necklaces"
                className="hidden peer"
                onChange={() => handleAllSubtypes("neckclace")}
                checked={searchParams.get("subcat") === null}
            />
            <label htmlFor="all-necklaces" className="cursor-pointer peer-checked:font-bold">
                All Necklaces
            </label>
        </div>

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

        {/* All Bracelets option */}
        <div>
            <input
                type="radio"
                name="subtype"
                id="all-bracelets"
                className="hidden peer"
                onChange={() => handleAllSubtypes("bracelet")}
                checked={searchParams.get("subcat") === null}
            />
            <label htmlFor="all-bracelets" className="cursor-pointer peer-checked:font-bold">
                All Bracelets
            </label>
        </div>

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
                
                {/* All Colors option */}
                <div>
                    <input
                        type="radio"
                        name="color"
                        id="all-colors"
                        className="hidden peer"
                        onChange={() => handleRemoveColor()}
                        checked={searchParams.get("color") === null}
                    />
                    <label htmlFor="all-colors" className="cursor-pointer peer-checked:font-bold">
                        All Colors
                    </label>
                </div>
                
                {/* Individual colors */}
                {colors.map((color) => (
                    <div key={color.id}>
                        <input
                            type="radio"
                            name="color"
                            id={color.id}
                            className="hidden peer"
                            onChange={() => handleColorSelect(color.slug)}
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