"use client";
import { useWixClient } from "@/context/wixContext";
import Image from "next/image";
import { useEffect } from "react";
import { currentCart } from "@wix/ecom";
import { useCartStore } from "@/hooks/useCardStore";

const CartModal = () => {

const cartItems = false;
const wixClient = useWixClient();

const {cart,getCart} = useCartStore();

useEffect (() => {
    getCart(wixClient);
}, [wixClient, getCart]);


    return (
        <div className="w-max absolute p-4 rounded-md shadow-md bg-white top-12 right-0 flex flex-col gap-6 z-20">
        {cartItems ? (
            <div className="">Cart is empty.</div> 
        ) : (
            <>
            <h2 className="text-xl">Shopping Cart</h2>
            {/* LIST */}
            <div className="flex flx-col gap-8">
                {/* Item */}
                <div className="flex gap-4">
                <Image src="" alt="product" width={50} height={50} className="object-cover rounded-md"/>
                    <div className="flex flex-col justify-between w-full">
                        <div className="">
                            {/* Top */}
                            {/* Title */}
                            <div className="flex items-center justify-between gap-8">
                                <h3 className="font-semibold">Product Name</h3>
                                <p className="p-1 text-sm text-gray-500">$99.99</p>
                            </div>
                            {/* Description */}
                            <div className="">
                                <p className="text-sm text-gray-500">available</p>
                            </div>
                            {/* Bottom */}
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Qty. 2</span>
                                <span className="text-blue-500">Remove</span>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
            {/* BOTTOM */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <span className="font-semibold">Subtotal</span>
                    <span className="font-semibold">$49</span>
                </div>
                <p className="text-gray-500 txt-sm mt-2 mb-4">
                    Lorem ipsum sit amet consectetur adipiscing elit. 
                </p>
                <div className="flex justify-between text-sm">
                    <button className="ring-gray-300 text-black py-3 px-4 ring-1 rounded-md hover:bg-green/80">View Cart</button>
                    <button className="bg-black text-white py-3 px-4 rounded-md hover:bg-green/80">Checkout</button>
                </div>
            </div>
            </>
        )}
        </div>
    )
} 

export default CartModal
