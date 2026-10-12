"use client";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
    return (
        <div className="flex flex-col gap-8 pt-16 bg-gray-100 relative">
            {/* TOP */}
            <div className="flex justify-between gap-24 px-4 md:px-8 lg:px-16 xl:32 2xl:px-64" style={{ maxWidth: "1700px", margin: "0 auto" }}>
                {/* LEFT */}
                <div className="w-1/3 md:w-1/2 lg:w-1/3 flex flex-col gap-4" >
                    <p>Based In Montreal</p>
                    <a href="mailto:megane.jewelry@gmail.com" className="text-black hover:underline">
                        megane.jewelry@gmail.com
                    </a>
                    <div className="flex items-center gap-4 mt-4">
                        <Image src="/facebook.png" alt="facebook" width={16} height={16} className="cursor-pointer"/>
                        <Image src="/instagram.png" alt="instagram" width={16} height={16} className="cursor-pointer"/>
                        <Image src="/youtube.png" alt="youtube" width={16} height={16} className="cursor-pointer"/> 
                    </div>
                </div>
                {/* MIDDLE */}
                <div className="w-1/3 sm:w-full flex items-top justify-left gap-24">
                    <div className="flex flex-col gap-2">
                        <h3 className="font-bold">Menu</h3>
                        <Link href="/">Shop</Link>
                        <Link href="/about">About</Link>
                        <Link href="/faq">FAQ</Link> 
                        <Link href="/contact">Contact</Link>   
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="font-bold">Order Information</h3>
                        <Link href="/return-policy">Return Policy</Link>
                        <Link href="/shipping">Shipping</Link>
                        <Link href="/copyright">Copyright</Link> 
                        <Link href="/privacy-policy">Privacy Policy</Link>
                     </div>
                </div>
                {/* RIGHT */}
                <div className="w-full md:w-1/2 lg:w-1/3 flex flex-col gap-8">
                    <p>Subscribe to my newsletter to be notified of new products and special offers!</p>
                    <form className="flex justify-between items-center gap-3 bg-white px-4 py-2 rounded-xl">
                        <input type="text" name="email" placeholder="Enter email address" className="bg-transparent flex-1 outline-none focus:outline-none" />
                        <button className="cursor-pointer text-white bg-black p-2 rounded-md hover:bg-gray">Send</button>
                    </form>
                    <span className="font-semibold">Secure payments</span>
                        <div className="flex justify-left gap-10">
                            <Image src="/visa.png" alt="visa" width={40} height={20}/>
                            <Image src="/mastercard.png" alt="mastercard" width={40} height={20}/>
                            <Image src="/paypal.png" alt="paypal" width={40} height={20}/>    
                        </div>
                </div>
            </div>
            {/* BOTTOM */}
            <div className="flex w-full text-sm md:flex-row items-center justify-between gap-8 mt-16 text-black py-4 text-center px-4 md:px-8 lg:px-16 xl:32 2xl:px-64" style={{ maxWidth: "1700px", margin: "0 auto" }}>
                <span>© {new Date().getFullYear()} Megane Jewelry. All rights reserved.</span>
                <div className="flex items-center gap-4">
                    <Link href="/terms-of-service">Terms of Service</Link>
                    <Link href="/privacy-policy">Privacy Policy</Link>
                </div>
            </div>
        </div>
    )
} 

export default Footer