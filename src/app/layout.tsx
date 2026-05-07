import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { WixClientContext, WixClientContextProvider } from "@/context/wixContext";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <WixClientContextProvider>
        <NavBar />
        {children}
        <Footer />
        </WixClientContextProvider>
      </body>
    </html>
  );
}
