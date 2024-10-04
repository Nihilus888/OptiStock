import React, { useState } from 'react';
import { ReactTyped as Typed } from 'react-typed';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send formData to your API endpoint here
    console.log(formData);
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="container mx-auto p-0 m-0">
        {/* Contact Section */}
        <section className="text-center mb-6 pt-10">
          <h1 className="text-5xl font-bold mb-4">
            <Typed
              strings={['Get in Touch with Us']}
              typeSpeed={50}
              backSpeed={30}
              loop={false}
              showCursor={false}
            />
          </h1>
          <p className="text-lg text-gray-400 mb-6">
            We would love to hear from you! Please fill out the form below, and we will get back to you as soon as possible.
          </p>
        </section>

        {/* Contact Form */}
        <section className="mb-6">
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
                placeholder="Your Name"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
                placeholder="you@example.com"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium text-gray-300">Message</label>
              <textarea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
                rows="4"
                placeholder="Your Message"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-300"
            >
              Send Message
            </button>
          </form>
        </section>

        {/* Contact Information Section */}
        <section className="text-center mb-6">
          <h2 className="text-4xl font-semibold mb-6">Contact Information</h2>
          <p className="text-lg text-gray-400 mb-2">Email: contact@example.com</p>
          <p className="text-lg text-gray-400 mb-2">Phone: +123456789</p>
          <p className="text-lg text-gray-400">Address: 123 Investment St, Finance City, FC 12345</p>
        </section>

        {/* FAQ Section */}
        <section className="text-center mb-6">
          <h2 className="text-4xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="text-lg text-gray-400 mb-4">
            <p className="mb-2"><strong>Q: How long will it take to respond?</strong></p>
            <p>A: We aim to respond to all inquiries within 24 hours.</p>
          </div>
          <div className="text-lg text-gray-400 mb-4">
            <p className="mb-2"><strong>Q: Can I schedule a call?</strong></p>
            <p>A: Yes, you can indicate your preferred time in the message section of the form.</p>
          </div>
        </section>

        {/* Social Media Section */}
        <section className="text-center mb-6">
          <h2 className="text-4xl font-semibold mb-6">Follow Us</h2>
          <div className="flex justify-center space-x-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500">Twitter</a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500">Facebook</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500">LinkedIn</a>
          </div>
        </section>

        {/* Location Section (Optional) */}
        <section className="text-center">
        <h2 className="text-4xl font-semibold mb-6">Our Location</h2>
        <p className="text-lg text-gray-400 mb-4">Visit us at our office:</p>
        <div className="flex justify-center">
            <iframe
            title="Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.9003735509595!2d-122.43129758468035!3d37.77492927975921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858199e03b4a73%3A0x4e09e3c1001b5b9!2s123%20Investment%20St%2C%20San%20Francisco%2C%20CA%2094103!5e0!3m2!1sen!2sus!4v1633025168481!5m2!1sen!2sus"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            ></iframe>
        </div>
        </section>
      </div>
    </div>
  );
}
