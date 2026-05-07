"use client";
import Image from "next/image";

const CartModal = () => {

const cartItems = false;

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
                <Image src="https://images.unsplash.com/photo-1773332585754-f1436987743b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="product" width={50} height={50} className="object-cover rounded-md"/>
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
