"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

type Category = {
    id: string;
    name: string;
    slug: string;
};

const Filter = ({ typeParents }: { typeParents: Category[] }) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        const params = new URLSearchParams(searchParams);
        params.set(name, value);
        replace(`${pathname}?${params.toString()}`);
    };
    return (
        <div className="flex justify-between flex-col sm:flex-row items-start sm:items-center gap-8">  
            <div className="flex items-center flex-col sm:flex-row gap-4">
                {/* Type */}
                <div className="md:hidden sm:flex items-center gap-4">
                    <span className="text-sm text-gray">Type:</span>
                    <select name="cat" id="type" className="outline-none border bg-transparent border-black/15 rounded-md px-2 py-1 text-sm font-medium" onChange={handleFilterChange}>
                        {typeParents.map((category) => (
                        <option key={category.id} value={category.slug}>
                            {category.name}
                        </option>
                        ))}
                    </select>
                </div>
                {/* Sort by */}
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray">Sort by:</span>
                    <select name="sort" id="sort" className="outline-none border bg-transparent border-black/15 rounded-md px-2 py-1 text-sm font-medium" onChange={handleFilterChange}>
                        <option value="asc_price">Price: Low to High</option>
                        <option value="desc_price">Price: High to Low</option>
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                    </select>
                </div>
                {/* Availability */}
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray">Availability:</span>
                    <select name="availability" id="availability" className="outline-none border bg-transparent border-black/15 rounded-md px-2 py-1 text-sm font-medium" onChange={handleFilterChange}>
                        <option value="all">All</option>
                        <option value="in_stock">In Stock</option>
                        <option value="out_of_stock">Out of Stock</option>
                    </select>
                </div>
               {/* Category */}
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray">Category:</span>
                    <select name="ribbon" id="ribbon" className="outline-none border bg-transparent px-2 py-1 text-sm font-medium" onChange={handleFilterChange}>
                        <option value="all">All</option>
                        <option value="best_selling">Best Selling</option>
                        <option value="on_sale">On sale</option>
                    </select>
                </div>             

            </div>
            {/* Number of products */}
            <div className="flex items-center gap-4">
                <span className="text-sm text-gray">Number of products:</span>
                <select name="number_of_products" id="number_of_products" className="outline-none border bg-transparent border-black/15 rounded-md px-2 py-1 text-sm font-bold" onChange={handleFilterChange}>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>
        </div>
    )
}   

export default Filter