"use client";
import Image from "next/image";
import { useState } from "react";

const ProductImages = () => {
const [index, setIndex] = useState(0);

    const Images = [{ 
        id:1, 
        url: ""
    },
    { 
        id:2, 
        url: ""
    },
    { 
        id:3, 
        url: ""
    },
    { 
        id:4, 
        url: ""
    }];

    return (
        <div className="">
            <div className="h-[500px] relative">
                <Image src={Images[index].url} alt="product" fill sizes="50vw" className="object-cover rounded-md"/>
            </div>
            <div className="flex justify-between gap-4 mt-8">
                {Images.map((image, i) => (
                    <div className="w-1/4 h-32 relative gap-4 mt-8 cursor-pointer" key={image.id} onClick={() => setIndex(i)}>
                    <Image 
                        src={image.url} 
                        alt="product" 
                        fill 
                        sizes="50vw" 
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