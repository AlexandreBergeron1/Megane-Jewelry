import Filter from "./Filter";
import { Suspense } from "react";

const FilterWrapper = async () => {
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
                treeReference: { appNamespace: "@wix/stores" },
            }),
        }
    );

    const result = await response.json();
    const allCategories = result?.categories ?? [];

    // Get type parents (top-level, excluding Color and All Products)
    const typeParents = allCategories.filter((c: any) =>
        !c.parentCategory?.id &&
        c.name !== "All Products" &&
        c.name !== "Color"
    );

    // Get colors (children of Color category)
    const colorId = "5456b76b-e67d-4e00-b827-0055eeac9e06";
    const colors = allCategories.filter((c: any) =>
        c.parentCategory?.id === colorId
    );

    return (
        <Suspense fallback={null}>
            <Filter typeParents={typeParents} colors={colors} />
        </Suspense>
    );
};

export default FilterWrapper;