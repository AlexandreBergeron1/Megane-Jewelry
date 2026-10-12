import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import { Libre_Franklin } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { WixClientContext, WixClientContextProvider } from "@/context/wixContext";

const inter = Inter({ subsets: ["latin"] });
const merchant = localFont({ 
    src: "../../public/fonts/Merchant-Regular.woff2",
    variable: "--font-merchant",
    display: "swap",
});

const nyght = localFont({ 
    src: "../../public/fonts/NyghtSerif-Light.woff2",
    variable: "--font-nyght",
    display: "swap",
});

const playfair = Playfair_Display({ 
    subsets: ["latin"],
    variable: "--font-playfair",
});

const libreFranklin = Libre_Franklin({ 
    subsets: ["latin"],
    variable: "--font-libre-franklin",
});

const cabinet = localFont({
    src: "../../public/fonts/CabinetGrotesk-Variable.woff2",
    variable: "--font-cabinet",
});

export const metadata: Metadata = {
  title: "Megane Jewelry",
  description: "A jewelry brand that offers a wide range of high-quality and stylish jewelry pieces. From elegant necklaces to trendy bracelets, our collection is designed to cater to every individual's unique style and preferences. With a commitment to craftsmanship and customer satisfaction, Megane Jewelry is your go-to destination for timeless and fashionable accessories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nyght.variable} ${merchant.variable} ${playfair.variable} ${libreFranklin.variable} ${cabinet.variable} bg-[#FFFAF5]`}>
        <WixClientContextProvider>
        <NavBar />
        {children}
        <Footer />
        </WixClientContextProvider>
      </body>
    </html>
  );
}
