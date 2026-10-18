import CategoriesClient from "./CategoriesClient";

export default function CategoriesServer({ categoriesData }: { categoriesData: any }) {
  const allCategories = categoriesData.categories ?? [];

  // Type parents (top-level, excluding Color and All Products)
  const typeParents = allCategories.filter((cat: any) =>
    !cat.parentCategory?.id &&
    cat.name !== "All Products" &&
    cat.name !== "Color"
  );

  // Find Necklaces and Bracelets IDs dynamically (with 's' at the end!)
  const necklaceCategory = allCategories.find((cat: any) => cat.name === "Necklaces"); // Fixed!
  const braceletCategory = allCategories.find((cat: any) => cat.name === "Bracelets"); // Fixed!

  // Children of Necklaces
  const necklaceChildren = allCategories.filter((cat: any) =>
    cat.parentCategory?.id === necklaceCategory?.id
  );

  // Children of Bracelets
  const braceletChildren = allCategories.filter((cat: any) =>
    cat.parentCategory?.id === braceletCategory?.id
  );

  // Find Color category ID dynamically
  const colorCategory = allCategories.find((cat: any) => cat.name === "Color");
  const colorId = colorCategory?.id;

  // Colors (children of Color)
  const colors = allCategories.filter((cat: any) =>
    cat.parentCategory?.id === colorId
  );
  
  return (
    <CategoriesClient 
      typeParents={typeParents}
      necklaceChildren={necklaceChildren}
      braceletChildren={braceletChildren}
      colors={colors}
    />
  );
}