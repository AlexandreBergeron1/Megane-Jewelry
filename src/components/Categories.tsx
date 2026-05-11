// components/Categories.tsx
import CategoriesClient from "./CategoriesClient";
import { Suspense } from "react";

const Categories = async () => {
    const response = await fetch(
        `https://www.wixapis.com/categories/v1/categories/search`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": process.env.WIX_API_KEY!,
                "wix-site-id": process.env.WIX_SITE_ID!,
            },
            body: JSON.stringify({
                treeReference: {
                    appNamespace: "@wix/stores",
                },
            }),
        }
    );

    const result = await response.json();
    const allCategories = result?.categories ?? [];

    // Parent types (no parentCategory.id = top-level), excluding All Products and Color
    const typeParents = allCategories.filter((c: any) =>
        !c.parentCategory?.id &&
        c.name !== "All Products" &&
        c.name !== "Color"
    );

    // Children of Necklace
    const necklaceId = "d46d48ed-40f4-4bf1-9958-9eec8b37a141";
    const necklaceChildren = allCategories.filter((c: any) =>
        c.parentCategory?.id === necklaceId
    );

    // Children of Bracelet
    const braceletId = "d891815c-5c92-4b46-bbdb-2a1b63569fff";
    const braceletChildren = allCategories.filter((c: any) =>
        c.parentCategory?.id === braceletId
    );

    // Colors (children of Color)
    const colorId = "5456b76b-e67d-4e00-b827-0055eeac9e06";
    const colors = allCategories.filter((c: any) =>
        c.parentCategory?.id === colorId
    );

    return (
        <Suspense fallback={null}>
        <CategoriesClient
            typeParents={typeParents}
            necklaceChildren={necklaceChildren}
            braceletChildren={braceletChildren}
            colors={colors}
        />
        </Suspense>
    );
};

export default Categories;

     