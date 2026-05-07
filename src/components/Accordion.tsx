"use client"
import { useState } from "react";


const Accordion = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const items = [
        {
            id: 1,
            title: "Materials",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies lacinia, nunc nisl aliquam nisl, eget aliquam nunc nisl eget nunc."
        },
        {
            id: 2,  
            title: "Shipping",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies lacinia, nunc nisl aliquam nisl, eget aliquam nunc nisl eget nunc."
        },
        {
            id: 3,     
            title: "Care Instructions",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies lacinia, nunc nisl aliquam nisl, eget aliquam nunc nisl eget nunc."
        },
        {
            id: 4,     
            title: "Returns",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies lacinia, nunc nisl aliquam nisl, eget aliquam nunc nisl eget nunc."
        }
    ]   


     const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const chevronOpen = (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
  );

    const chevronClosed = (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
  </svg>
  );

    return (
    <div className="w-full mx-auto">
      {items.map((item, index) => (
        <div key={index} className="border-b py-3">
          <button
            onClick={() => toggle(index)}
            className="w-full flex justify-between items-center text-left"
          >
            <span className="font-medium">{item.title}</span>
            <span>{openIndex === index ? chevronOpen : chevronClosed}</span>
          </button>

          {openIndex === index && (
            <p className="mt-2 text-sm text-gray-600">
              {item.content}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default Accordion