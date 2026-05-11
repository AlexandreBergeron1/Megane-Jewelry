"use client";

import { createClient, OAuthStrategy } from "@wix/sdk";
import { collections, products } from "@wix/stores";
import { currentCart } from "@wix/ecom";
import Cookies from "js-cookie";
import { createContext, ReactNode, useContext } from "react";

export const createWixClient = () => createClient({
    auth: OAuthStrategy({
        clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
        tokens: {
            refreshToken: JSON.parse(Cookies.get("refreshToken") || "null"),
            accessToken: { value: "", expiresAt: 0 }
        }
    }),
    modules: {
        products,
        collections,
        currentCart,
    },
});

export type WixClient = ReturnType<typeof createWixClient>;
export const WixClientContext = createContext<WixClient | null>(null);

export const useWixClient = () => {
    const client = useContext(WixClientContext);
    if (!client) throw new Error("WixClientContext not found");
    return client;
};

type Props = { children: ReactNode };

export const WixClientContextProvider = ({ children }: Props) => {
    const wixClient = createWixClient();

    return (
        <WixClientContext.Provider value={wixClient}>
            {children}
        </WixClientContext.Provider>
    );
};