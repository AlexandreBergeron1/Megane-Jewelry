import Image from "next/image";
import Link from "next/link";
import Filter from "./Filter";
import Categories from "./Categories";


const ProductList = ({ products }) => {
return (
<>
    <div className="flex gap-16">
        <Categories />
        <div className="flex flex-col">
            <Filter />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 mt-20">
                {products.map((p) => (
                <Link href={"/" + p.slug} className="flex flex-col gap-4" key={p._id}>
                <div className="relative w-full h-80">
                    <Image
                        src={p.media?.main?.image?.url || "/product.png"}
                        alt={p.name} fill sizes="25vw"
                        className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity ease duration-500" />
                    <Image
                        src={p.media?.items?.[1]?.image?.url || p.media?.mainMedia?.image?.url || "/product.png"}
                        alt={p.name} fill sizes="25vw" className="absolute object-cover rounded-md" />
                </div>
                <div className="flex justify-between">
                    <h3 className="font-semibold">{p.name}</h3>
                    <p className="p-1 text-sm text-gray-500">${p.actualPriceRange?.minValue?.amount}</p>
                </div>
                <div>
                    {/* <div className="text-sm text-gray-500">{p.additionalInfoSections.find((section:any) => section.title === "Short Description")?.description || "No description available" }</div> */}
                    <button
                        className="ring-1 mt-5 bg-green text-white py-2 px-4 rounded-2xl w-max hover:bg-green/80">Add to
                        Cart</button>
                </div>
                </Link>))}
            </div>
        </div>
    </div>
</>
)
}

export default ProductList