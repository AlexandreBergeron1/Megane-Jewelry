"use client";

import { useState } from "react";
import Image from "next/image";

type Review = {
  id: string;
  username: string;
  rating: number;
  comment: string;
  photos?: string[];
  productName: string;
  date: string;
};

// Sample data - replace with real reviews from your data source
const SAMPLE_REVIEWS: Review[] = [
  {
    id: "1",
    username: "sarah_m",
    rating: 5,
    comment: "Absolutely love this necklace! The silver finish is beautiful and it looks even better in person.",
    photos: ["/product.png"],
    productName: "Silver Chandelier Necklace",
    date: "2026-09-12",
  },
  {
    id: "2",
    username: "jjames",
    rating: 4,
    comment: "Lovely piece, arrived well packaged. Slightly smaller than I expected but still gorgeous.",
    productName: "Pink Pearls Bracelet",
    date: "2026-08-30",
  },
];

const Stars = ({ rating, size = "w-4 h-4" }: { rating: number; size?: string }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <svg
        key={star}
        className={`${size} ${star <= Math.round(rating) ? "text-black" : "text-gray-300"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const ProductReviews = ({ reviews = SAMPLE_REVIEWS }: { reviews?: Review[] }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const total = reviews.length;
  const average = total ? reviews.reduce((sum, r) => sum + r.rating, 0) / total : 0;

  // Count of reviews for each star level (5 down to 1)
  const distribution = [5, 4, 3, 2, 1].map((stars) => {
    const count = reviews.filter((r) => r.rating === stars).length;
    const percent = total ? (count / total) * 100 : 0;
    return { stars, count, percent };
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    // TODO: send to your backend / Wix Reviews
    console.log({ rating, comment });
    setSubmitted(true);
    setRating(0);
    setComment("");
  };

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-8">Reviews</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* LEFT COLUMN: Summary */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl font-bold">{average.toFixed(1)}</span>
            <div className="flex flex-col">
              <Stars rating={average} size="w-5 h-5" />
            </div>
          </div>
          <p className="text-sm text-gray-400">Based on {total} reviews</p>

          <div className="flex flex-col gap-3 mt-4">
            {distribution.map(({ stars, count, percent }) => (
              <div key={stars} className="flex items-center gap-3 text-sm">
                <span className="w-12 whitespace-nowrap">{stars} star{stars > 1 ? "s" : ""}</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-black rounded-full transition-all duration-500"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <span className="w-8 text-right text-gray-500">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Reviews list + form */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col">
            {reviews.map((review, i) => (
              <div
                key={review.id}
                className={`flex flex-col gap-3 py-6 ${i !== 0 ? "border-t border-gray-200" : ""}`}
              >
                <div className="flex justify-between items-center">
                  <Stars rating={review.rating} />
                  <span className="text-xs text-gray-400">{review.date}</span>
                </div>
                <p className="font-semibold">{review.username}</p>
                <p className="text-gray-600">{review.comment}</p>

                {review.photos && review.photos.length > 0 && (
                  <div className="flex gap-2 mt-1">
                    {review.photos.map((src, idx) => (
                      <div key={idx} className="relative w-20 h-20 rounded-md overflow-hidden">
                        <Image src={src} alt="Review photo" fill sizes="80px" className="object-cover" />
                      </div>
                    ))}
                  </div>
                )}

                <p className="text-xs text-gray-400">Purchased: {review.productName}</p>
              </div>
            ))}
          </div>

          {/* Leave a review form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 border-t border-gray-200 pt-8">
            <h3 className="text-lg font-semibold">Leave a review</h3>

            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  aria-label={`${star} star${star > 1 ? "s" : ""}`}
                >
                  <svg
                    className={`w-6 h-6 ${star <= (hoverRating || rating) ? "text-black" : "text-gray-300"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              ))}
            </div>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience with this product..."
              rows={4}
              className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
            />

            <button
              type="submit"
              disabled={rating === 0}
              className="self-start bg-black text-white rounded-full px-6 py-2 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Submit
            </button>

            {submitted && <p className="text-sm text-green-600">Thank you for your review!</p>}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ProductReviews;