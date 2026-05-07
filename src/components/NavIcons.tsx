import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/dist/client/components/navigation";
import CartModal from "./CartModal";

const NavIcons = () => {

    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const router = useRouter();

    const isLoggedIn = false; // Replace with actual authentication logic
    const handleProfile = () => {
        if (!isLoggedIn) {
            router.push("/login");
        }
        setIsProfileOpen((prev) => !prev);
    }

    return (
        <div className="flex items-center gap-4 xl:gap-6 relative">
            <Image  src="/profile.png" alt="search" width={22} height={22} className="cursor-pointer" onClick={handleProfile}/>
            {isProfileOpen && <div className="absolute top-10 right-0 bg-gray p-4 rounded-md text-sm shadow-md z-20">
                <Link href="/profile" className="">Profile</Link>
                <div className="mt-2 cursor-pointer">Logout</div>
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