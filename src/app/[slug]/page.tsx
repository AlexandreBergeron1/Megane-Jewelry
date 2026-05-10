import AddColors from "@/components/AddCart";
import CustomizedProducts from "@/components/CustomizedProducts";
import ProductImages from "@/components/ProductImages";
import Accordion from "@/components/Accordion";
import AddCart from "@/components/AddCart";
import { wixServerClient } from "@/lib/wixServerClient";
import { notFound } from "next/navigation";

export const revalidate = 60;

const SinglePage = async ({params}:{params:{slug: string }}) => {
    const wixClient = await wixServerClient;

    const products = await wixServerClient.products
    .queryProducts()
    .eq("slug", params.slug)
    .find();

    if(!products.items[0]) {
        return notFound();
    }
    const product = products.items[0];

return (
<div className="px-4 md:px-8 lg:px-16 xl:32 2xl:px-64 relative flex flex-col lg:flex-row gap-16 mt-20">
    {/* IMG */}
    <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <ProductImages items={product.media?.items}/>
    </div>
    {/* TEXTS */}
    <div className="w-full lg:w-1/2 flex flex-col gap-8">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <div className="text-gray-500" dangerouslySetInnerHTML={{ __html: product.description }} />
            {product.price?.price === product.price?.discountedPrice ? (<p className="text-gray-500 font-medium text-2xl">${product.price?.price}</p>) : 
            (
                <div className="flex items-center gap-4">
                <p className="text-gray-500 font-medium text-2xl">${product.price?.price}</p>
                <p className="text-gray-500 line-through text-xl">${product.price?.discountedPrice}</p>
                </div>
            )}
        {product.stock?.inStock ? (product.variants && product.productOptions ? (<CustomizedProducts productId={product._id} variants={product.variants} productOptions={product.productOptions}/>) : (<AddCart productId={product._id} variantId="00000000-0000-0000-0000-000000000000" stockNumber={product.stock?.quantity || 0}/>)) : (<div className="text-red">Out of stock</div>)}
        <Accordion product={product} />
    </div>
</div>
)
}

export default SinglePage