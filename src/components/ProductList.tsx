import Image from "next/image";
import Link from "next/link";
import Filter from "./Filter";
import Categories from "./Categories";
import Pagination from "./Pagination";
import FilterWrapper from "./FilterWrapper";
import { wixServerClient } from "@/lib/wixServerClient";

const ProductList = ({ products, hasNext, hasPrev, totalCount, limit, availability }: {
    products: any[];
    hasNext: boolean;
    hasPrev: boolean;
    totalCount: number;
    limit: number;
    availability: string;
}) => {

return (
<>
    <div className="flex gap-16">
        <Categories />
        <div className="flex flex-col">
            <FilterWrapper />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 mt-20">
                {products.map((p) => (
                <Link href={"/" + p.slug} className="flex flex-col gap-4" style={availability !== "out_of_stock" && !p.stock?.inStock ? { opacity: 0.5 } : {}} key={p._id}>
                <div className="relative w-full h-80">
                    <Image
                        src={p.media?.mainMedia?.image?.url || "/product.png"}
                        alt={p.name} fill sizes="25vw"
                        className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity ease duration-500" />
                    <Image
                        src={p.media?.items[1]?.image?.url || p.media?.main?.image?.url || "/product.png"}
                        alt={p.name} fill sizes="25vw" className="absolute object-cover rounded-md" />
                </div>
                <div className="flex justify-between">
                    <h3 className="font-semibold">{p.name}</h3>
                    <p className="p-1 text-sm text-gray-500">${p.price?.price}</p>
                </div>
                <div>
                    {/* <div className="text-sm text-gray-500">{p.additionalInfoSections.find((section:any) => section.title === "Short Description")?.description || "No description available" }</div> */}
                    {p.stock?.inStock ? (<button className="ring-1 ring-black text-md text-black py-2 px-4 rounded-2xl w-max hover:bg-black hover:text-white transition-all ease duration-250">Add to Cart</button>) : (<div className="mb-5 text-red">Out of stock</div>)}
                </div>
                </Link>))}
            </div>
            {totalCount > limit && (<Pagination hasNext={hasNext} hasPrev={hasPrev} totalCount={totalCount} limit={limit}/>)}
        </div>
    </div>
</>
)
}

export default ProductList