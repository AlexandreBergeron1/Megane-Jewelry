"use client";

import Link from "next/dist/client/link";
import Menu from "./Menu";
import Image from "next/image";
//import NavIcons from "./NavIcons";
import { Suspense } from "react";
import SearchBar from "./SearchBar";
import dynamic from "next/dynamic";

const NavIcons = dynamic(()=>import("./NavIcons"),{ssr:false})

const NavBar = () => {    
    return (
        <div className="h-28 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative" style={{ maxWidth: "1700px", margin: "0 auto" }}>
            {/* MOBILE*/}
            <div className="h-full flex items-center justify-between md:hidden">  
            <Link href="/">MEGANE JEWELRY</Link>
            <Menu/>
            </div>
            {/* BIGGER SCREENS*/}
            <div className="hidden md:flex items-center justify-between gap-8 h-full">
                {/* LEFT */}
                <div className="w-[400px] flex items-center gap-12">
                    <Link href="/" className="flex items-center gap-3">
                    <Image src="/mj-monogram.png" alt="logo" width={75} height={75}/>
                    </Link>
                    <div className="hidden lg:flex items-center gap-4">
                        {/*<Link className="text-sm" href="/">Shop</Link>*/}
                        <Link className="text-sm" href="/about">About</Link>
                        <Link className="text-sm" href="/faq">FAQ</Link>
                        <Link className="text-sm" href="/contact">Contact</Link>       
                    </div>
                </div>
                {/* RIGHT */}
                <div className="w-2/3 flex items-center justify-between gap-8">
                <Suspense fallback={null}>
                    <SearchBar/>
                </Suspense>
                <NavIcons/>
                </div>
            </div>
        </div>
    )
} 

export default NavBar