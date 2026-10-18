import ProductListClient from "@/components/ProductListClient";
import CategoriesServer from "@/components/CategoriesServer";
import FilterWrapper from "@/components/FilterWrapper";
import { wixServerClient } from "@/lib/wixServerClient";
import { Suspense } from "react";

export const revalidate = 30;

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

async function getCategories() {
    try {
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

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Failed to fetch categories:", error);
        return { categories: [] };
    }
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

async function getCategoryProductIds(categoryId: string): Promise<string[]> {
    const res = await fetch(
        `https://www.wixapis.com/categories/v1/categories/${categoryId}/list-items`,
        {
            method: "POST",
            headers: WIX_HEADERS,
            body: JSON.stringify({
                treeReference: { appNamespace: "@wix/stores" },
            }),
        }
    );
    const data = await res.json();
    return data?.items?.map((item: any) => item.catalogItemId) ?? [];
}


async function getProducts(categoryId?: string, name?: string, sort?: string, limit?: number, page?: number, availability?: string, colorCategoryId?: string) {
    const productLimit = limit || 25;
    const skip = ((page || 1) - 1) * productLimit;
    let items: any[] = [];
    let totalCount = 0;

    let productIds: string[] | undefined;
    if (categoryId) {
        productIds = await getCategoryProductIds(categoryId);
    }

    if (colorCategoryId) {
        const colorIds = await getCategoryProductIds(colorCategoryId);
        console.log("[filter] color category", colorCategoryId, "→", colorIds.length, "ids");
        productIds = productIds
            ? productIds.filter((id) => colorIds.includes(id))
            : colorIds;
    }

    if (productIds) {
        if (productIds.length === 0) {
            return { items: [], hasNext: false, hasPrev: false, totalCount: 0 };
        }
        const res = await wixServerClient.products
            .queryProducts()
            .in("_id", productIds)
            .find();
        items = res.items;
        totalCount = res.totalCount ?? 0;
    } else {
        const res = await wixServerClient.products.queryProducts().find();
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

    const paginatedItems = sortProducts(items, sort).slice(skip, skip + productLimit);

    return {
        items: paginatedItems,
        hasNext: skip + productLimit < items.length,
        hasPrev: skip > 0,
        totalCount: items.length,
    };
}

async function getColorCategoryId(colorSlug: string): Promise<string | undefined> {
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
    const match = data?.categories?.find((c: any) => c.slug === colorSlug);
    return match?.id;
}

export default async function HomePage({
    searchParams,
}: {
    searchParams: { cat?: string; subcat?: string; name?: string; sort?: string; number_of_products?: string; page?: string; availability?: string; color?: string; };
}) {
    const slug = searchParams.subcat || searchParams.cat || undefined;
    const categoryId = slug ? await getCategoryIdFromSlug(slug) : undefined;
    const colorId = searchParams.color ? await getColorCategoryId(searchParams.color) : undefined; // NEW
    
    const limit = searchParams.number_of_products ? parseInt(searchParams.number_of_products) : 25;
    const page = searchParams.page ? parseInt(searchParams.page) : 1;
    
    const [{ items: products, hasNext, hasPrev, totalCount }, categoriesData] = await Promise.all([
    getProducts(
        categoryId,                  
        searchParams.name,
        searchParams.sort,
        limit,
        page,
        searchParams.availability,
        colorId,                     
    ),
    getCategories(),
]);

    return (
        <div className="my-12 pt-8 pb-16 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64" style={{ maxWidth: "1700px", margin: "0 auto" }}>
            <div className="flex justify-between gap-16">
                <CategoriesServer categoriesData={categoriesData} />
                
                <div className="flex flex-1 flex-col">
                    <FilterWrapper />
                    <Suspense fallback={<div>Loading...</div>}>
                        <ProductListClient
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
        </div>
    );
}