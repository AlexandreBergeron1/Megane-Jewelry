"use client"
import { useState } from "react";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";

const ContactForm = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    requestType: "general",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    setError("");

    try {
      const token = await executeRecaptcha("submit_form");

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken: token,
        }),
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
      } else {
        setError("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-24 px-4 pt-8 pb-16 md:px-8 lg:px-16 xl:px-32 2xl:px-64" style={{ maxWidth: "1700px", margin: "0 auto" }}>
      <h1 className="text-2xl pb-2 font-bold">Contact</h1>
      <p className="text-gray-600 pb-8">Have questions or want to learn more about our jewelry? Reach out to me by filling the form below!</p>

      {submitted && (
        <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-md">
          Thank you for your message! I'll get back to you soon.
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="John"
            />
          </div>

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
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Doe"
            />
          </div>
        </div>

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
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="john@example.com"
          />
        </div>

        <div className="flex flex-col gap-2 mb-6">
          <label htmlFor="requestType" className="font-medium text-sm">
            Type of Request
          </label>
          <select
            id="requestType"
            name="requestType"
            value={formData.requestType}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="general">General Inquiry</option>
            <option value="order">Order Related</option>
            <option value="custom">Custom Order</option>
            <option value="return">Return/Exchange</option>
            <option value="other">Other</option>
          </select>
        </div>

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
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black resize-none"
            placeholder="Your message here..."
          />
        </div>

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

const ContactPage = () => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY!}>
      <ContactForm />
    </GoogleReCaptchaProvider>
  );
};

export default ContactPage;