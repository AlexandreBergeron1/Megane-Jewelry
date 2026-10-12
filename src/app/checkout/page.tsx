"use client";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/CheckoutForm";
import { useCartStore } from "@/hooks/useCartStore";
import { useWixClient } from "@/context/wixContext";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const CheckoutPage = () => {
    const [clientSecret, setClientSecret] = useState("");
    const { cart } = useCartStore();
    const wixClient = useWixClient();

    const totalAmount = cart.lineItems?.reduce((acc, item) => {
        return acc + (parseFloat(item.price?.amount || "0") * (item.quantity || 1));
    }, 0) || 0;

    useEffect(() => {
        if (totalAmount === 0) return;

        fetch("/api/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: totalAmount, currency: "cad" }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [totalAmount]);

    return (
        <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
            <h1 className="text-2xl font-semibold mb-8">Checkout</h1>
            <div className="flex flex-col lg:flex-row gap-16">
                {/* Order Summary */}
                <div className="w-full lg:w-1/2 flex flex-col gap-4">
                    <h2 className="text-lg font-medium">Order Summary</h2>
                    {cart.lineItems?.map((item) => (
                        <div key={item._id} className="flex justify-between text-sm">
                            <span>{item.productName?.original} x{item.quantity}</span>
                            <span>${(parseFloat(item.price?.amount || "0") * (item.quantity || 1)).toFixed(2)}</span>
                        </div>
                    ))}
                    <div className="flex justify-between font-semibold border-t pt-4">
                        <span>Total</span>
                        <span>${totalAmount.toFixed(2)}</span>
                    </div>
                </div>
                {/* Payment Form */}
                <div className="w-full lg:w-1/2">
                    {clientSecret && (
                        <Elements stripe={stripePromise} options={{ clientSecret }}>
                            <CheckoutForm />
                        </Elements>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;