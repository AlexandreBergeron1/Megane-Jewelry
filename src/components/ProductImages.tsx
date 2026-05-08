"use client";
import Image from "next/image";
import { useState } from "react";

const ProductImages = ({items}:{items:any}) => {
const [index, setIndex] = useState(0);

    // const Images = [{ 
    //     id:1, 
    //     url: ""
    // },
    // { 
    //     id:2, 
    //     url: ""
    // },
    // { 
    //     id:3, 
    //     url: ""
    // },
    // { 
    //     id:4, 
    //     url: ""
    // }];

    return (
        <div className="">
            <div className="h-[600px] relative">
                <Image src={items[index].image?.url} alt="product" fill sizes="60vw" className="object-cover rounded-md"/>
            </div>
            <div className="grid grid-cols-6 gap-x-4 gap-y-8 mt-8">
                {items.map((item:any, i:null) => (
                    <div className="h-32 relative cursor-pointer" key={item._id} onClick={() => setIndex(i)}>
                    <Image 
                        src={item.image.url} 
                        alt="product" 
                        fill
                        sizes="100vw"
                        className="object-cover rounded-md"
                        onClick={() => setIndex(i)}
                    />
                    </div>
                ))}
            </div>
        </div>
    )
}   

export default ProductImages;  