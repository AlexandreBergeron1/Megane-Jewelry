import ProductList from "@/components/ProductList";
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

function sortProducts(items: any[], sort?: string) {
    if (!sort) return items;
    const sorted = [...items];
    switch (sort) {
        case "asc_price":
            return sorted.sort((a, b) =>
                (a.price?.price ?? 0) - (b.price?.price ?? 0)
            );
        case "desc_price":
            return sorted.sort((a, b) =>
                (b.price?.price ?? 0) - (a.price?.price ?? 0)
            );
        case "newest":
            return sorted.sort((a, b) =>
                new Date(b._createdDate).getTime() - new Date(a._createdDate).getTime()
            );
        case "oldest":
            return sorted.sort((a, b) =>
                new Date(a._createdDate).getTime() - new Date(b._createdDate).getTime()
            );
        default:
            return items;
    }
}


async function getProducts(categoryId?: string, name?: string, sort?: string, limit?: number, page?: number, availability?: string) {
    const productLimit = limit || 25;
    const skip = ((page || 1) - 1) * productLimit;
    let items: any[] = [];
    let totalCount = 0;

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
        if (productIds.length === 0) return { items: [], hasNext: false, hasPrev: false, totalCount: 0 };

        let query = wixServerClient.products.queryProducts()
            .in("_id", productIds)
            .limit(productLimit)
            .skip(skip);

        const res = await query.find();
        items = res.items;
        totalCount = res.totalCount ?? 0;
    } else {
        let query = wixServerClient.products.queryProducts()
            .limit(productLimit)
            .skip(skip);

        const res = await query.find();
        items = res.items;
        totalCount = res.totalCount ?? 0;
    }
    

    if (name) {
        items = items.filter((p: any) =>
            p.name?.toLowerCase().includes(name.toLowerCase())
        );
    }

    if (availability === "in_stock") {
        items = items.filter((p: any) => p.stock?.inStock === true);
    }
    if (availability === "out_of_stock") {
        items = items.filter((p: any) => p.stock?.inStock === false);
    }

    return {
        items: sortProducts(items, sort),
        hasNext: skip + productLimit < totalCount,
        hasPrev: skip > 0,
        totalCount,
    };
}

export default async function HomePage({
    searchParams,
}: {
    searchParams: { cat?: string; subcat?: string; name?: string; sort?: string; number_of_products?: string; page?: string; availability?: string; };
}) {
    const slug = searchParams.subcat || searchParams.cat || undefined;
    const categoryId = slug ? await getCategoryIdFromSlug(slug) : undefined;
    const limit = searchParams.number_of_products ? parseInt(searchParams.number_of_products) : 25;
    const page = searchParams.page ? parseInt(searchParams.page) : 1;
    const { items: products, hasNext, hasPrev, totalCount } = await getProducts(
        categoryId,
        searchParams.name,
        searchParams.sort,
        limit,
        page,
        searchParams.availability,
    );

    return (
        <div>
            <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
                <Suspense fallback={<div>Loading...</div>}>
                    <ProductList
                        categoryId={process.env.NEXT_PUBLIC_WIX_FEATURED_PRODUCTS_CATEGORY_ID || ""}
                        products={products}
                        hasNext={hasNext}
                        hasPrev={hasPrev}
                        limit={limit}
                        totalCount={totalCount}
                        availability={searchParams.availability}
                    />
                </Suspense>
            </div>
        </div>
    );
}