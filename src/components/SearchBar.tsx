"use client";
import Image from "next/image";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const SearchBar = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const isHomePage = pathname === "/";
    const [name, setName] = useState(searchParams.get("name") || "");

    useEffect(() => {
        if (!isHomePage) return; // only auto-update on homepage

        const timeout = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());
            if (name) {
                params.set("name", name);
            } else {
                params.delete("name");
            }
            router.push(`?${params.toString()}`);
        }, 300);

        return () => clearTimeout(timeout);
    }, [name]);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isHomePage && name) {
            router.push(`/?name=${name}`); // redirect to homepage with search
        }
    }

    return (
        <form className="flex justify-between items-center gap-3 bg-gray-100 px-4 py-2 flex-1 rounded-xl" onSubmit={handleSearch}>
            <input
                type="text"
                name="name"
                placeholder="Search"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-transparent flex-1 outline-none focus:outline-none"
            />
            <button className="cursor-pointer text-white p-2 rounded-md hover:bg-gray">
                <Image src="/search.png" alt="search" width={16} height={16}/>
            </button>
        </form>
    )
} 

export default SearchBar;