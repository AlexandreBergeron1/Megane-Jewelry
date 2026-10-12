export default function OrderConfirmation() {
    return (
        <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex flex-col items-center gap-8">
            <h1 className="text-2xl font-semibold">Thank you for your order!</h1>
            <p className="text-gray-500">Your payment was successful. You will receive a confirmation email shortly.</p>
        </div>
    );
}