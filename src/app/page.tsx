import ProductList from "@/components/ProductList";
import Categories from "@/components/Categories";
import Filter from "@/components/Filter";
import { wixServerClient } from "@/lib/wixServerClient";
import { Suspense } from "react";

export const revalidate = 60;

const WIX_HEADERS = {
    "Content-Type": "application/json",
    "Authorization": process.env.WIX_API_KEY!,
    "wix-site-id": process.env.WIX_SITE_ID!,
};

async function getProducts(categoryId?: string) {
    if (categoryId) {
        // Step 1: get product IDs in that category
        const itemsRes = await fetch(
            `https://www.wixapis.com/categories/v1/categories/${categoryId}/list-items`,
            {
                method: "POST",
                headers: WIX_HEADERS,
                body: JSON.stringify({
                    treeReference: { appNamespace: "@wix/stores" },
                }),
            }
        );

        const itemsData = await itemsRes.json();
        const productIds = itemsData?.items?.map((item: any) => item.catalogItemId) ?? [];

        if (productIds.length === 0) return [];

        // Step 2: fetch products by those IDs via REST
        const productsRes = await fetch(
            `https://www.wixapis.com/stores/v3/products/query`,
            {
                method: "POST",
                headers: WIX_HEADERS,
                body: JSON.stringify({
                    query: {
                        filter: { id: { $in: productIds } },
                    },
                }),
            }
        );

        const productsData = await productsRes.json();
        return productsData?.products ?? [];
    }

    // No category — fetch all via REST
    const res = await fetch(`https://www.wixapis.com/stores/v3/products/query`, {
        method: "POST",
        headers: WIX_HEADERS,
        body: JSON.stringify({ query: {} }),
    });

    
    const data = await res.json();
    console.log("first product:", JSON.stringify(data?.products?.[0], null, 2));
    return data?.products ?? [];
}

export default async function HomePage({
    searchParams,
}: {
    searchParams: { cat?: string; subcat?: string };
}) {
    const categoryId = searchParams.subcat || searchParams.cat || undefined;
    const products = await getProducts(categoryId);

    return (
        <div>
            <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
                <Suspense fallback={<div>Loading...</div>}>
                    <ProductList
                        categoryId={process.env.NEXT_PUBLIC_WIX_FEATURED_PRODUCTS_CATEGORY_ID}
                        products={products}
                    />
                </Suspense>
            </div>
        </div>
    );
}