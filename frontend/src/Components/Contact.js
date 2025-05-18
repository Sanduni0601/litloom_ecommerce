import React, { useState } from "react";
import axios from "axios";
import Header from "./Header";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/contact", formData);
      alert("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      alert("Failed to send message.");
      console.error(error);
    }
  };

  return (
    <>
    <Header/>
    <div className="min-h-screen bg-white p-6 md:p-12 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Litloom</h1>
      <p className="text-gray-600 mb-8 text-center max-w-xl">
        Have a question, suggestion, or just want to say hello? We’d love to hear from you!
      </p>

      <div className="w-full max-w-4xl bg-gray-50 shadow-xl rounded-2xl p-8 grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Contact Info */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-700">Get in Touch</h2>
          <p className="text-gray-600">📧 Email: support@litloom.com</p>
          <p className="text-gray-600">📞 Phone: +94 71 123 4567</p>
          <p className="text-gray-600">📍 Address: 123 Book Street, Colombo, Sri Lanka</p>
          <div className="mt-6">
            <h3 className="font-semibold text-gray-700 mb-2">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-600 hover:underline">Facebook</a>
              <a href="#" className="text-blue-400 hover:underline">Twitter</a>
              <a href="#" className="text-pink-600 hover:underline">Instagram</a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
          <input
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            placeholder="Your Message"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default ContactUs;
