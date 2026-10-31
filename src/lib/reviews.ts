import { supabase } from "@/lib/supabase";

export const REVIEWS_PER_PAGE = 5;

export async function getApprovedReviews(page = 1) {
  const from = (page - 1) * REVIEWS_PER_PAGE;
  const to = from + REVIEWS_PER_PAGE - 1;

  const { data, error, count } = await supabase
    .from("reviews")
    .select("*", { count: "exact" })
    .eq("status", "approved")
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    console.error("Failed to load reviews:", error);
    return { reviews: [], totalPages: 0, page };
  }

  return {
    reviews: (data ?? []).map((r) => ({
      id: r.id,
      username: r.username,
      rating: r.rating,
      comment: r.comment ?? "",
      photos: r.photos ?? [],
      productName: r.product_name ?? "",
      productSlug: r.product_slug ?? "",
      date: new Date(r.created_at).toLocaleDateString(),
    })),
    totalPages: Math.ceil((count ?? 0) / REVIEWS_PER_PAGE),
    page,
  };
}