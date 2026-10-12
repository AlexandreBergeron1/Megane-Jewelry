"use client";
import { useState } from "react";
import { useWixClient } from "@/context/wixContext";
import { useCartStore } from "@/hooks/useCartStore";

const AddCart = ({ productId, variantId, stockNumber }: { productId: string; variantId: string; stockNumber: number }) => {

    const [quantity, setQuantity] = useState(1);
    const [isLoading, setIsLoading] = useState(false); //local state
    const { addItem } = useCartStore();

    const wixClient = useWixClient();
    

    const increment = () => {
        if (quantity < stockNumber) setQuantity((prev) => prev + 1);
    };

    const handleAddToCart = async () => {
        setIsLoading(true);
        await addItem(wixClient, productId, variantId, quantity);
        setIsLoading(false);
    };

    return (
        <div className="flex flex-col gap-4">
            <h4 className="font-medium">Add a quantity</h4>
            <div className="flex justify-left gap-10 items-center">
                <div className="flex items-center gap-4">
                    <button
                        className="w-10 h-10 flex items-center justify-center border border-gray-500 rounded-full hover:bg-black hover:border-black hover:text-white"
                        onClick={increment}>
                        +
                    </button>
                    <span className="text-md font-bold">{quantity}</span>
                    <button
                        className="w-10 h-10 flex items-center justify-center border border-gray-500 rounded-full hover:bg-black hover:border-black hover:text-white"
                        onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}>
                        -
                    </button>
                </div>
                {stockNumber < 6 && (
                    <div className="text-sm">Only <span className="font-bold">{stockNumber} items</span> left!</div>
                )}
            </div>
            <button
                onClick={handleAddToCart}
                disabled={isLoading}
                className="w-36 text-sm bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-500">
                {isLoading ? "Adding..." : "Add to Cart"}
            </button>
        </div>
    );
};

export default AddCart;