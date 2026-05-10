"use client";
import { useRouter, useSearchParams } from "next/navigation";

const Pagination = ({ hasNext, hasPrev, totalCount, limit }: {
    hasNext: boolean;
    hasPrev: boolean;
    totalCount: number;
    limit: number;
}) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentPage = parseInt(searchParams.get("page") || "1");
    const totalPages = Math.ceil(totalCount / limit);
    console.log("limit" + limit);
    console.log("totalPages" + totalPages);

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", newPage.toString());
        router.push(`?${params.toString()}`);
    };

    return (
        <div className="flex justify-left gap-5 mt-12">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={!hasPrev}
                className="text-black disabled:hidden disabled:cursor-not-allowed hover:text-black/60"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-9 h-9 rounded-full text-sm transition-all ease duration-250 
                        ${currentPage === page
                            ? "ring-1 ring-black bg-black text-white"
                            : "text-black hover:text-black/60"
                        }`}
                >
                    {page}
                </button>
            ))}
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={!hasNext}
                className="text-black disabled:hidden disabled:cursor-not-allowed hover:text-black/60"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </button>
        </div>
    );
};

export default Pagination;