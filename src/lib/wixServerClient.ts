// lib/wixServerClient.ts
import { createClient, ApiKeyStrategy } from "@wix/sdk";
import { products, collections } from "@wix/stores";
import { categories } from '@wix/categories';

export const wixServerClient = createClient({
    auth: ApiKeyStrategy({
    apiKey: process.env.WIX_API_KEY!,
    siteId: process.env.WIX_SITE_ID!,
    accountId: process.env.WIX_ACCOUNT_ID!,
  }),
  modules: { products, collections, categories },
});