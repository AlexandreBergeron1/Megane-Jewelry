"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SearchBar = () => {
    const router = useRouter();

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;

        if (name) {
            router.push(`/list?name=${name}`)
        }
    }

    return (
        <form className="flex justify-between items-center gap-3 bg-gray-100 px-4 py-2 flex-1 rounded-xl" onSubmit={handleSearch}>
            <input type="text" name="name" placeholder="Search" className="bg-transparent flex-1 outline-none focus:outline-none" />
            <button className="cursor-pointer text-white p-2 rounded-md hover:bg-gray">
                <Image src="/search.png" alt="search" width={16} height={16}/>
            </button>
        </form>
    )
} 

export default SearchBar