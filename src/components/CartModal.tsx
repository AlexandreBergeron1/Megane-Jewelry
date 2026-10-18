"use client";
import { useWixClient } from "@/context/wixContext";
import Image from "next/image";
import { useEffect } from "react";
import { useCartStore } from "@/hooks/useCartStore";
import { media as WixMedia } from "@wix/sdk";
import { useRouter } from "next/navigation";

const CartModal = () => {
    const wixClient = useWixClient();
    const { cart, isLoading, getCart, removeItem } = useCartStore();
    const router = useRouter();

    useEffect(() => {
        getCart(wixClient);
    }, [wixClient, getCart]);

    return (
        <div className="w-max absolute p-4 rounded-md shadow-md bg-white top-12 right-0 flex flex-col gap-6 z-20">
            {!cart.lineItems ? (
                <div>Cart is empty.</div>
            ) : (
                <>
                    <h2 className="text-xl">Shopping Cart</h2>
                    {/* LIST */}
                    <div className="flex flex-col gap-8">
                        {cart.lineItems.map((item) => (
                            <div className="flex gap-4" key={item._id}>
                                {item.image && <Image src={WixMedia.getScaledToFillImageUrl(item.image,72,96,{})} alt={item._id} width={72} height={96} className="object-cover rounded-md" />}
                                <div className="flex flex-col justify-between w-full">
                                    <div>
                                        <div className="flex items-center justify-between gap-8">
                                            <h3 className="font-semibold">{item.productName?.original}</h3>
                                            <p className="flex items-center gap-2 p-1 text-sm text-gray-500">{item.quantity && item.quantity > 1 && <div className="text-xs text-gray-700">{item.quantity} x </div>}${item.price?.amount}</p>
                                        </div>
                                        {/* <div>
                                            <p className="text-sm text-gray-500">{item.availability?.status}</p>
                                        </div> */}
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Qty. {item.quantity}</span>
                                            <span className="text-red-500" 
                                            style={{cursor: isLoading ? "not-allowed" : "pointer"}}
                                            onClick={()=>removeItem(wixClient,item._id!)}>Remove</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* BOTTOM */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <span className="font-semibold">Subtotal</span>
                            <span className="font-semibold">${cart.subtotal.amount}</span>
                        </div>
                        {/* <p className="text-gray-500 text-sm mt-2 mb-4">
                            Lorem ipsum sit amet consectetur adipiscing elit.
                        </p> */}
                        <div className="flex justify-between text-sm">
                            <button className="ring-gray-300 text-black py-3 px-4 ring-1 rounded-md hover:bg-black hover:text-white">View Cart</button>
                            <button className="bg-black text-white py-3 px-4 rounded-md hover:bg-green/80 disabled:cursor-not-allowed disabled:opacity-75" onClick={() => router.push("/checkout")} disabled={isLoading}>Checkout</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartModal;