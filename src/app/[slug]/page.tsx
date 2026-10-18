import { wixServerClient } from "@/lib/wixServerClient";
import { notFound } from "next/navigation";
import { SinglePageClient } from "@/components/SinglePageClient";

export const revalidate = 30;

const SinglePage = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const products = await wixServerClient.products
    .queryProducts()
    .eq("slug", params.slug)
    .find();

  if (!products.items[0]) {
    return notFound();
  }

  const product = products.items[0];

  // Fetch similar products
  let filteredSimilarProducts = [];

  try {
    if (product.productType) {
      const similarProducts = await wixServerClient.products
        .queryProducts()
        .eq("productType", product.productType)
        .find();

      filteredSimilarProducts = similarProducts.items
        .filter((p) => p._id !== product._id)
        .slice(0, 4);
    }
  } catch (error) {
    console.error("Error fetching similar products:", error);
    filteredSimilarProducts = [];
  }

  return (
    <SinglePageClient 
      product={product} 
      filteredSimilarProducts={filteredSimilarProducts}
    />
  );
};

export default SinglePage;