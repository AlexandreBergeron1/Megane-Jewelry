import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: Request) {
  const body = await req.json();
  const { productId, productName, productSlug, username, rating, comment, photos } = body;

  if (!productId || !username || typeof rating !== "number" || rating < 1 || rating > 5) {
    return NextResponse.json(
      { error: "Invalid input", received: { productId, username, rating } },
      { status: 400 }
    );
  }

  const { error } = await supabaseAdmin.from("reviews").insert({
    product_id: productId,
    product_name: productName,
    product_slug: String(productSlug ?? "").slice(0, 200),
    username: String(username).slice(0, 50),
    rating,
    comment: String(comment ?? "").slice(0, 2000),
    photos: Array.isArray(photos) ? photos.slice(0, 3) : [],
  });

  if (error) {
    console.error("Supabase insert failed:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}