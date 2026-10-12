"use client"
import { useState } from "react";

const FAQ_ITEMS = [
  {
    title: "What are your shipping times?",
    content: "We offer standard shipping (5-7 business days) and express shipping (2-3 business days). Orders are processed within 24 hours."
  },
  {
    title: "What is your return policy?",
    content: "We accept returns within 30 days of purchase for unused items in original packaging. Please contact our support team to initiate a return."
  },
  {
    title: "Do you offer international shipping?",
    content: "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location. Check your cart for exact rates."
  },
  {
    title: "How do I care for my purchase?",
    content: "Care instructions vary by product. Please refer to the care tag on your item or contact us for specific guidance on maintenance and cleaning."
  },
  {
    title: "Can I modify or cancel my order?",
    content: "Orders can be modified or cancelled within 24 hours of purchase. After that, please contact our support team for assistance."
  }
];

const FaqAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
    <div className="w-full mx-auto mt-8">
      {FAQ_ITEMS.map((item, index) => (
        <div key={index} className="border-b border-gray-300 py-4">
          <button
            onClick={() => toggle(index)}
            className="w-full flex justify-between items-center text-left hover:text-gray-600 transition"
          >
            <h2 className="font-medium text-lg">{item.title}</h2>
            <span>{openIndex === index ? chevronOpen : chevronClosed}</span>
          </button>

          {openIndex === index && (
            <div className="mt-4 text-md text-gray-600">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const FaqPage = () => {
  return (
    <div className="mt-24 px-4 pt-8 pb-16 md:px-8 lg:px-16 xl:px-32 2xl:px-64" style={{ maxWidth: "1700px", margin: "0 auto" }}>
      <h1 className="text-2xl pb-2">Frequently Asked Questions</h1>
      <p className="text-black pb-8">Find answers to common questions about our products and services.</p>
      <FaqAccordion />
    </div>
  );
};

export default FaqPage;