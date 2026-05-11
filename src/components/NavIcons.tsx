import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useWixClient } from "@/context/wixContext";
import CartModal from "./CartModal";
import Cookies from "js-cookie";

const NavIcons = () => {

    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const pathName = usePathname();
    const wixClient = useWixClient();

    const [isLoggedIn, setIsLoggedIn] = useState(false); // 👈 safe default

    useEffect(() => {
        try {
            setIsLoggedIn(wixClient.auth.loggedIn());
        } catch (err) {
            console.log("auth check failed:", err);
        }
    }, [wixClient]);
    
    const handleProfile = () => {
        if (!isLoggedIn) {
            router.push("/login");
        } else {
            setIsProfileOpen((prev) => !prev);
        }
    }

    const handleLogout = async () => {
        setIsLoading(true)
        Cookies.remove("refreshToken");
        const { logoutUrl } = await wixClient.auth.logout(window.location.href); 
        setIsLoading(false);
        setIsProfileOpen(false);
        router.push(logoutUrl);
    }

    return (
        <div className="flex items-center gap-4 xl:gap-6 relative">
            <Image  src="/profile.png" alt="search" width={22} height={22} className="cursor-pointer" onClick={handleProfile}/>
            {isProfileOpen && <div className="absolute top-10 right-0 bg-white p-4 rounded-md text-sm shadow-md z-20">
                <Link href="/profile" className="">Profile</Link>
                <div className="mt-2 cursor-pointer" onClick={handleLogout}>{isLoading ? "Logging out" : "Logout"}</div>
            </div>}
            <Image  src="/notification.png" alt="search" width={22} height={22} className="cursor-pointer"/>
            <div className="relative cursor-pointer">
                <Image  src="/cart.png" alt="search" width={22} height={22} className="cursor-pointer" onClick={()=>setIsCartOpen(prev=>!prev)}/>
                <div className="absolute -top-4 -right-4 w-6 h-6 bg-[#F35C7A] text-sm rounded-full text-white flex items-center justify-center">
                    2
                </div>
            </div>
            {isCartOpen && <CartModal />}
        </div>
    )
} 

export default NavIcons