"use client";
import Link from "next/dist/client/link";
import Image from "next/image";
import { useState } from "react";

const Menu = () => {

    const [open , setOpen] = useState(false)

    return (
        <div className="">
            <Image src="/menu.png" alt="menu" width={28} height={28} className="cursor-pointer" onClick={() => setOpen((prev) => !prev)}/>
                {open && (<div className="absolute bg-[#1D4D38] text-black left-0 top-20 w-full h-[calc(100vh-80px)] flex flex-col items-center justify-center z-30 gap-8">
                    <Link href="/">Shop</Link>
                    <Link href="/">About</Link>
                    <Link href="/">FAQ</Link>
                    <Link href="/">Contact</Link>
                    <Link href="/">Logout</Link>
                    <Link href="/">Cart</Link>
                </div>)}
        </div>
    )
}  

export default Menu   