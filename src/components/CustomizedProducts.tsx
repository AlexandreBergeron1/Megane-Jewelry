"use client"
import { useState, useEffect } from "react";
import { products } from "@wix/stores";
import AddCart from "@/components/AddCart";

const CustomizedProducts = ({ productId, variants, productOptions }: { 
    productId: string; 
    variants: products.Variant[]; 
    productOptions: products.ProductOption[] 
}) => {
    
    const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>({});
    const [selectedVariants, setSelectedVariants] = useState<products.Variant>();

    useEffect(() => {
        const variant = variants.find(v => {
            const variantChoices = v.choices;
            if (!variantChoices) return false;
            return Object.entries(selectedOptions).every(
                ([key, value]) => variantChoices[key] === value
            );
        });
        setSelectedVariants(variant);
    }, [selectedOptions, variants]);

    const handleOptionSelect = (optionType: string, choice: string) => {
        setSelectedOptions(prev => ({ ...prev, [optionType]: choice }));
    };

    const isVariantInStock = (choices: { [key: string]: string }) => {
        return variants.some((variant) => {
            const variantChoices = variant.choices;
            if (!variantChoices) return false;

            const matchesChoices = Object.entries(choices).every(
                ([key, value]) => variantChoices[key] === value
            );

            const inStock = variant.stock?.trackQuantity
                ? variant.stock?.inStock && variant.stock?.quantity && variant.stock?.quantity > 0
                : variant.stock?.inStock;

            return matchesChoices && inStock;
        });
    };

    return (
        <div className="flex flex-col gap-6">
            {productOptions.map((option) => (
                <div key={option.name} className="flex flex-col gap-4">
                    <h4 className="font-medium">Choose a {option.name}</h4>
                    <ul className="flex items-center gap-3">
                        {option.choices?.map((choice: products.Choice) => {
                            const disabled = !isVariantInStock({ ...selectedOptions, [option.name!]: choice.description! });
                            const selected = selectedOptions[option.name!] === choice.description;
                            const clickHandler = disabled ? undefined : () => handleOptionSelect(option.name!, choice.description!);

                            return option.name === "Couleur" ? (
                                <li
                                    key={choice.value}
                                    className="w-6 h-6 rounded-full ring-1 ring-gray-300 relative"
                                    style={{ backgroundColor: choice.value, cursor: disabled ? "not-allowed" : "pointer" }}
                                    onClick={clickHandler}
                                >
                                    {selected && (
                                        <div className="absolute w-8 h-8 rounded-full ring-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                                    )}
                                </li>
                            ) : (
                                <li
                                    key={choice.value}
                                    className="ring-1 ring-lama text-lama rounded-md py-1 px-4 text-sm"
                                    style={{ cursor: disabled ? "not-allowed" : "pointer" }}
                                    onClick={clickHandler}
                                >
                                    {selected && (
                                        <div className="absolute w-8 h-[2px] bg-red rotate-45 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                                    )}
                                    {choice.description}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ))}
            <AddCart 
                productId={productId} 
                variantId={selectedVariants?._id || "00000000-0000-0000-0000-000000000000"} 
                stockNumber={selectedVariants?.stock?.quantity || 0}
            />
        </div>
    );
};

export default CustomizedProducts;