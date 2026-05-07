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
    const selectedType = searchParams.get("cat");

    const handleTypeSelect = (id: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("cat", id);
        params.delete("subcat"); // reset subtype on type change
        router.push(`?${params.toString()}`);
    };

    const handleSubtypeSelect = (id: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("subcat", id);
        router.push(`?${params.toString()}`);
    };

    const showNecklaceSubtype = selectedType === "d46d48ed-40f4-4bf1-9958-9eec8b37a141";
    const showBraceletSubtype = selectedType === "d891815c-5c92-4b46-bbdb-2a1b63569fff";

    return (
        <div className="hidden flex-col w-50 gap-10 sm:flex">

            {/* Type */}
            <div className="flex flex-col gap-2">
                <h3 className="text-md font-bold">Type</h3>
                {typeParents.map((category) => (
                    <div key={category.id}>
                        <input
                            type="radio"
                            name="type"
                            id={category.id}
                            className="hidden peer"
                            onChange={() => handleTypeSelect(category.id)}
                            checked={selectedType === category.id}
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
                    <h3 className="text-md font-bold">Necklace Subtype</h3>
                    {necklaceChildren.map((category) => (
                        <div key={category.id}>
                            <input
                                type="radio"
                                name="subtype"
                                id={category.id}
                                className="hidden peer"
                                onChange={() => handleSubtypeSelect(category.id)}
                                checked={searchParams.get("subcat") === category.id}
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
                    <h3 className="text-md font-bold">Bracelet Subtype</h3>
                    {braceletChildren.map((category) => (
                        <div key={category.id}>
                            <input
                                type="radio"
                                name="subtype"
                                id={category.id}
                                className="hidden peer"
                                onChange={() => handleSubtypeSelect(category.id)}
                                checked={searchParams.get("subcat") === category.id}
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
                <h3 className="text-md font-bold">Color</h3>
                {colors.map((color) => (
                    <div key={color.id}>
                        <input
                            type="radio"
                            name="color"
                            id={color.id}
                            className="hidden peer"
                            onChange={() => {
                                const params = new URLSearchParams(searchParams.toString());
                                params.set("color", color.id);
                                router.push(`?${params.toString()}`);
                            }}
                            checked={searchParams.get("color") === color.id}
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