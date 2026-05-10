import Filter from "./Filter";

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

    const typeParents = allCategories.filter((c: any) =>
        !c.parentCategory?.id &&
        c.name !== "All Products" &&
        c.name !== "Color"
    );

    return <Filter typeParents={typeParents} />;
};

export default FilterWrapper;