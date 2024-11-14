"use client"

import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';

const ContactUs = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    // Check if the browser supports geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error fetching location: ", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  // Construct the Google Maps URL with the current location
  const googleMapsUrl = location.latitude && location.longitude
  ? `https://www.google.com/maps/embed/v1/view?key=AIzaSyAE6_ve6CktXtftQ7j2oUxbHIhb0DiTl2w&center=${location.latitude},${location.longitude}&zoom=14`
  : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.2364553909536!2d-122.41941568468166!3d37.77492927975983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064b8e5e4b9%3A0x6e09b6e6b113d7f1!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2sus!4v1619498050912!5m2!1sen!2sus";
  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      {/* Header Section */}
      <div className="text-center py-10">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="mt-4 text-gray-400">Home / Contact</p>
      </div>

      {/* Contact Section */}
      <div className="max-w-7xl mx-auto p-6 flex flex-col md:flex-row gap-10">
        {/* Contact Form */}
        <div className="md:w-1/2 bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold mb-6">Get In Touch</h2>
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="p-3 bg-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="p-3 bg-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Subject"
              className="p-3 bg-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Type Here..."
              rows="4"
              className="p-3 bg-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg transition duration-300"
            >
              Send Now
            </button>
          </form>
        </div>

        {/* Contact Info Section */}
        <div className="md:w-1/2 flex flex-col gap-8 text-gray-300">
          <p>
            In tempus nisl turpis, at ultricies dui eleifend a. Quisque et quam vel mauris consectetur pharetra euismod
            et eleifend. Nullam orci purus.
          </p>

          <div className="space-y-4">
            <div className="flex items-center">
              <span className="material-icons text-white">phone</span>
              <p className="ml-3">Phone Number: <span className="text-white">+402 4032 567</span></p>
            </div>
            <div className="flex items-center">
              <span className="material-icons text-white">email</span>
              <p className="ml-3">Email Address: <span className="text-white">example@email.com</span></p>
            </div>
            <div className="flex items-center">
              <span className="material-icons text-white">whatsapp</span>
              <p className="ml-3">WhatsApp: <span className="text-white">082-245-7253</span></p>
            </div>
            <div className="flex items-center">
              <span className="material-icons text-white">location_on</span>
              <p className="ml-3">Our Office: <span className="text-white">2463 Oak Ridge Omaha, GA 45065</span></p>
            </div>
          </div>

          {/* Google Map */}
          <iframe
            className="w-full h-64 rounded-lg shadow-lg mt-6"
            src={googleMapsUrl}
            allowFullScreen=""
            loading="lazy"
          />
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gray-800 py-20 mt-10">
        <div className="text-center">
          <h2 className="text-3xl font-semibold">We Are Always Ready To Take A Perfect Shot</h2>
          <p className="mt-4 text-gray-400">Hire us now and let’s capture your vision perfectly!</p>
          <Button className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
            Hire Us Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;