import AddColors from "@/components/AddCart";
import CustomizedProducts from "@/components/CustomizedProducts";
import ProductImages from "@/components/ProductImages";
import Accordion from "@/components/Accordion";
import AddCart from "@/components/AddCart";

const SinglePage = () => {
return (
<div className="px-4 md:px-8 lg:px-16 xl:32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
    {/* IMG */}
    <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <ProductImages />
    </div>
    {/* TEXTS */}
    <div className="w-full lg:w-1/2 flex flex-col gap-8">
        <h1 className="text-3xl font-bold">Product Name</h1>
        <p className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit.</p>
        <div className="flex items-center gap-4">
            <p className="text-gray-500 font-medium text-2xl">$99.99</p>
            <p className="text-gray-500 line-through text-xl">$99.99</p>
        </div>
        <CustomizedProducts />
        <AddCart />
        <Accordion />
    </div>
</div>
)
}

export default SinglePage