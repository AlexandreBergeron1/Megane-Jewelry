"use client";
import { useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setIsLoading(true);
        setError("");

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/order-confirmation`,
            },
        });

        if (error) {
            setError(error.message || "Something went wrong.");
        }

        setIsLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <PaymentElement />
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <button
                disabled={!stripe || isLoading}
                className="bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed mt-4"
            >
                {isLoading ? "Processing..." : "Pay Now"}
            </button>
        </form>
    );
};

export default CheckoutForm;