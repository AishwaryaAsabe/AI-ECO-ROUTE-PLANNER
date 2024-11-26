"use client"
import Link from 'next/link';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic (send form data to API or backend)
    console.log('Form submitted', formData);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white py-8 text-center">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="text-lg">We would love to hear from you! Reach out with any questions or feedback.</p>
      </header>

      {/* Contact Form Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Form */}
            <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-4">Our Contact Information</h2>
              <p className="text-gray-700 mb-4">
                Feel free to reach out to us directly via phone or email. You can also visit our office at the address below.
              </p>
              <div className="space-y-2">
                <p className="text-lg font-semibold">
                  <span className="text-blue-600">Phone:</span> +1 123-456-7890
                </p>
                <p className="text-lg font-semibold">
                  <span className="text-blue-600">Email:</span> support@aiecorouteplanner.com
                </p>
                <p className="text-lg font-semibold">
                  <span className="text-blue-600">Address:</span> 123 Green Route Blvd, EcoCity, Country
                </p>
              </div>

              {/* Optional: Google Maps Embed */}
              <div className="mt-6">
                <h3 className="text-lg font-bold mb-2">Our Location</h3>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093747!2d144.95592831531685!3d-37.8172099797517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577f5f8b6fdf2c7!2s123+Green+Route+Blvd!5e0!3m2!1sen!2sau!4v1621493553459!5m2!1sen!2sau"
                  width="100%"
                  height="250"
                  frameBorder="0"
                  allowFullScreen=""
                  aria-hidden="false"
                  tabIndex="0"
                  className="rounded-md shadow-lg"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      
    </div>
  );
}
