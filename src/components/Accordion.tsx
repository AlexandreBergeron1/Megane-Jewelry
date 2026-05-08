"use client"
import { useState } from "react";

const ACCORDION_TITLES = ["Materials", "Refund Policy", "Shipping", "Care Instructions"];

const Accordion = ({ product }: { product: any }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const items = (product.additionalInfoSections ?? [])
        .filter((section: any) => ACCORDION_TITLES.includes(section.title) && section.description)
        .map((section: any, id: number) => ({
            id,
            title: section.title,
            content: section.description,
        }));

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const chevronOpen = (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
    );

    const chevronClosed = (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </svg>
    );

    return (
        <div className="w-full mx-auto">
            {items.map((item: any, index: number) => (
                <div key={index} className="border-b py-3">
                    <button
                        onClick={() => toggle(index)}
                        className="w-full flex justify-between items-center text-left"
                    >
                        <span className="font-medium">{item.title}</span>
                        <span>{openIndex === index ? chevronOpen : chevronClosed}</span>
                    </button>

                    {openIndex === index && (
                        <div
                            className="mt-2 text-sm text-gray-600 prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{ __html: item.content }}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}

export default Accordion;