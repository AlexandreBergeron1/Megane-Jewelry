"use client";

import { useState, useEffect } from "react";
import { products } from "@wix/stores";
import AddCart from "@/components/AddCart";

type CustomizedProductsProps = {
  productId: string;
  variants: products.Variant[];
  productOptions: products.ProductOption[];
  onColorChange: (color: string) => void;
  onVariantChange: (variant: products.Variant | undefined) => void;
  onColorMediaChange: (media: any) => void;
};

const CustomizedProducts = ({
  productId,
  variants,
  productOptions,
  onColorChange,
  onVariantChange,
  onColorMediaChange,
}: CustomizedProductsProps) => {
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string;
  }>({});

  const [selectedVariants, setSelectedVariants] =
    useState<products.Variant>();

  // Auto-select first color on mount
  useEffect(() => {
    const colorOption = productOptions.find(
      (opt) => opt.name === "Color"
    );
    if (colorOption && colorOption.choices && colorOption.choices.length > 0) {
      const firstColor = colorOption.choices[0];
      setSelectedOptions((prev) => ({
        ...prev,
        Color: firstColor.description!,
      }));
      onColorChange(firstColor.description!);
      
      // Pass the first color's media
      if (firstColor.media) {
        onColorMediaChange(firstColor.media);
      }
    }
  }, [productOptions, onColorChange, onColorMediaChange]);

  useEffect(() => {
    const variant = variants.find((v) => {
      const variantChoices = v.choices;
      if (!variantChoices) return false;

      return (
        Object.keys(selectedOptions).length > 0 &&
        Object.entries(selectedOptions).every(
          ([key, value]) => variantChoices[key] === value
        )
      );
    });

    setSelectedVariants(variant);
    onVariantChange(variant);
  }, [selectedOptions, variants, onVariantChange]);

  const handleOptionSelect = (
    optionType: string,
    choice: string
  ) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionType]: choice,
    }));

    if (optionType === "Color") {
      onColorChange(choice);
      
      // Find the selected color choice and pass its media
      const colorOption = productOptions.find(
        (opt) => opt.name === "Color"
      );
      const selectedChoice = colorOption?.choices?.find(
        (c: any) => c.description === choice
      );
      if (selectedChoice?.media) {
        onColorMediaChange(selectedChoice.media);
      }
    }
  };

  const isVariantInStock = (choices: {
    [key: string]: string;
  }) => {
    return variants.some((variant) => {
      const variantChoices = variant.choices;
      if (!variantChoices) return false;

      const matchesChoices = Object.entries(choices).every(
        ([key, value]) => variantChoices[key] === value
      );

      const inStock = variant.stock?.trackQuantity
        ? !!variant.stock?.inStock &&
          (variant.stock?.quantity ?? 0) > 0
        : !!variant.stock?.inStock;

      return matchesChoices && inStock;
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {productOptions.map((option) => (
        <div key={option.name} className="flex flex-col gap-4">
          <h4 className="font-medium">
            Choose a {option.name?.toLowerCase()}
          </h4>

          <ul className="flex items-center gap-3">
            {option.choices?.map((choice: products.Choice) => {
              const optionName = option.name!;
              const choiceDescription = choice.description!;

              const disabled = !isVariantInStock({
                ...selectedOptions,
                [optionName]: choiceDescription,
              });

              const selected =
                selectedOptions[optionName] === choiceDescription;

              const clickHandler = disabled
                ? undefined
                : () =>
                    handleOptionSelect(
                      optionName,
                      choiceDescription
                    );

              return optionName === "Color" ? (
                <li
                  key={choice.value}
                  role="button"
                  aria-label={choice.description}
                  aria-pressed={selected}
                  aria-disabled={disabled}
                  className="w-6 h-6 rounded-full ring-1 ring-gray-300 relative"
                  style={{
                    backgroundColor: choice.value,
                    cursor: disabled ? "not-allowed" : "pointer",
                    opacity: disabled ? 0.4 : 1,
                  }}
                  onClick={clickHandler}
                >
                  {selected && (
                    <div className="absolute w-8 h-8 rounded-full ring-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                  )}
                </li>
              ) : (
                <li
                  key={choice.value}
                  role="button"
                  aria-pressed={selected}
                  aria-disabled={disabled}
                  className={`ring-1 rounded-md py-1 px-4 text-sm transition-all ${
                    selected
                      ? "ring-black bg-black text-white"
                      : "ring-gray-300 text-black hover:ring-gray-400"
                  }`}
                  style={{
                    cursor: disabled ? "not-allowed" : "pointer",
                    opacity: disabled ? 0.5 : 1,
                  }}
                  onClick={clickHandler}
                >
                  {choice.description}
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      <AddCart
        productId={productId}
        variantId={
          selectedVariants?._id ||
          "00000000-0000-0000-0000-000000000000"
        }
        stockNumber={selectedVariants?.stock?.quantity || 0}
      />
    </div>
  );
};

export default CustomizedProducts;