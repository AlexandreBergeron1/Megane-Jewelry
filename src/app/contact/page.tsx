"use client"
import { useState } from "react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    requestType: "general",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          requestType: "general",
          message: "",
        });
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-24 px-4 pt-8 pb-16 md:px-8 lg:px-16 xl:px-32 2xl:px-64" style={{ maxWidth: "1700px", margin: "0 auto" }}>
      <h1 className="text-2xl pb-2 font-bold">Contact</h1>
      <p className="text-gray-600 pb-8">Have questions or want to learn more about our jewelry? Reach out to me by filling the form below!</p>

      {submitted && (
        <div className="mb-6 p-4 text-black rounded-md">
          Thank you for your message! I'll get back to you soon.
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* First Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="firstName" className="font-medium text-sm">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="ring-1 ring-gray-300 rounded-md bg-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="John"
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="lastName" className="font-medium text-sm">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="ring-1 ring-gray-300 rounded-md bg-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Doe"
            />
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2 mb-6">
          <label htmlFor="email" className="font-medium text-sm">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="ring-1 ring-gray-300 rounded-md bg-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="john@example.com"
          />
        </div>

        {/* Type of Request */}
        <div className="flex flex-col gap-2 mb-6">
          <label htmlFor="requestType" className="font-medium text-sm">
            Type of Request
          </label>
          <select
            id="requestType"
            name="requestType"
            value={formData.requestType}
            onChange={handleChange}
            className="ring-1 ring-gray-300 rounded-md bg-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="general">General Inquiry</option>
            <option value="order">Order Related</option>
            <option value="custom">Custom Order</option>
            <option value="return">Return/Exchange</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Message */}
        <div className="flex flex-col gap-2 mb-6">
          <label htmlFor="message" className="font-medium text-sm">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="ring-1 ring-gray-300 rounded-md bg-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black resize-none"
            placeholder="Your message here..."
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full md:w-auto ring-1 ring-black text-md font-semibold text-black py-2 px-8 rounded-2xl hover:bg-black hover:text-white transition-all ease duration-250 disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default ContactPage;