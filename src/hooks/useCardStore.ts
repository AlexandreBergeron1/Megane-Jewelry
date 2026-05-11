import { create } from 'zustand';
import { currentCart } from "@wix/ecom";
import { WixClient } from '@/context/wixContext';

type CartState = {
    cart: currentCart.Cart;
    isLoading: boolean;
    counter: number;
    getCart: (wixClient: WixClient) => void;
    addItem: (wixClient: WixClient, productId: string, variantId: string, quantity: number) => void;
    removeItem: (wixClient: WixClient, itemId: string) => void;
}

export const useCartStore = create<CartState>((set) => ({
    cart: {} as currentCart.Cart,
    isLoading: true,
    counter: 0,
    getCart: async (wixClient) => {
        const cart = await wixClient.currentCart.getCurrentCart();
        set({
            cart: cart || {} as currentCart.Cart,
            isLoading: false,
            counter: cart?.lineItems?.length || 0,
        });
    },
    addItem: async (wixClient, productId, variantId, quantity) => {},
    removeItem: async (wixClient, itemId) => {},
}));