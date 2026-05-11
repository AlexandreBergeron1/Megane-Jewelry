"use client";
import Image from "next/image";
import { useState } from "react";

const ProductImages = ({items}:{items:any}) => {
const [index, setIndex] = useState(0);

return (
<div className="flex flex-col">
    <div className="h-[600px] relative">
        <Image src={items[index].image?.url} alt="product" fill sizes="60vw" className="object-cover rounded-md" />
    </div>
    <div className="grid grid-cols-6 gap-x-4 gap-y-8 mt-8">
        {items.map((item: any, i: number) => (
        <div className="h-32 relative cursor-pointer" key={item._id} onClick={()=> setIndex(i)}>
            <Image src={item.image.url} alt="product" width={item.image.width || 500} height={item.image.height || 500}
                className="object-cover rounded-md w-full h-full" />
        </div>
        ))}
    </div>
</div>
)
}

export default ProductImages;