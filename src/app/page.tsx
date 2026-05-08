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

async function getCategoryIdFromSlug(slug: string): Promise<string | undefined> {
    const response = await fetch(
        `https://www.wixapis.com/categories/v1/categories/search`,
        {
            method: "POST",
            headers: WIX_HEADERS,
            body: JSON.stringify({
                treeReference: { appNamespace: "@wix/stores" },
            }),
        }
    );
    const data = await response.json();
    const match = data?.categories?.find((c: any) => c.slug === slug);
    return match?.id;
}

async function getProducts(categoryId?: string, name?: string) {
    if (categoryId) {
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

        const res = await wixServerClient.products.queryProducts()
            .in("_id", productIds)
            .find();

        const items = res.items;
        if (name) {
            return items.filter((p: any) =>
                p.name?.toLowerCase().includes(name.toLowerCase())
            );
        }
        return items;
    }

    const res = await wixServerClient.products.queryProducts().find();
    const items = res.items;

    if (name) {
        return items.filter((p: any) =>
            p.name?.toLowerCase().includes(name.toLowerCase())
        );
    }
    return items;
}

export default async function HomePage({
    searchParams,
}: {
    searchParams: { cat?: string; subcat?: string; name?: string };
}) {
    const slug = searchParams.subcat || searchParams.cat || undefined;
    const categoryId = slug ? await getCategoryIdFromSlug(slug) : undefined;
    const products = await getProducts(categoryId, searchParams.name);

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