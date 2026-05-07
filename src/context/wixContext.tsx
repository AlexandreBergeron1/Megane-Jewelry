"use client";

import { createClient, OAuthStrategy } from "@wix/sdk";
import { collections, products } from "@wix/stores";
import Cookies from "js-cookie";
import { createContext, ReactNode } from "react";

const refreshToken = JSON.parse(Cookies.get("refreshToken") || "null");   

 const wixClient = createClient({
  auth: OAuthStrategy({
    clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
    tokens: {
        refreshToken, 
        accessToken: {value:"", expiresAt: 0}
    }
  }),
  modules: {
    products,
    collections
  },
});

export type WixClient = typeof wixClient;
export const WixClientContext = createContext<WixClient | null>(null);

type Props = {
  children: ReactNode;
};

export const WixClientContextProvider = ({ children }: Props) => {

  return (
    <WixClientContext.Provider value={wixClient}>
      {children}
    </WixClientContext.Provider>
  );
};