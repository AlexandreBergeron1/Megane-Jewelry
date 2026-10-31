import { wixServerClient } from "@/lib/wixServerClient";
import { notFound } from "next/navigation";
import { SinglePageClient } from "@/components/SinglePageClient";
import { getApprovedReviews } from "@/lib/reviews";
import ProductReviews from "@/components/ProductReviews";
import { ProductSuggestions } from "@/components/ProductSuggestions";

export const revalidate = 30;

const SinglePage = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { reviewPage?: string };
}) => {
  const reviewPage = Math.max(1, parseInt(searchParams.reviewPage ?? "1") || 1);

  const products = await wixServerClient.products
    .queryProducts()
    .eq("slug", params.slug)
    .find();

  if (!products.items[0]) {
    return notFound();
  }

  const product = products.items[0];
  const { reviews, totalPages } = await getApprovedReviews(reviewPage);

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
    <>
      <SinglePageClient
        product={product}
        filteredSimilarProducts={filteredSimilarProducts}
      />
      <ProductReviews
        reviews={reviews}
        productId={product._id!}
        productName={product.name ?? ""}
        page={reviewPage}
        totalPages={totalPages}
        productSlug={product.slug ?? ""}
      />
      <ProductSuggestions filteredSimilarProducts={filteredSimilarProducts} />
    </>
  );
};

export default SinglePage;