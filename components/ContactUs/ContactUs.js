"use client"

import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { Mail, MapPin, MessageCircleMore, Phone } from 'lucide-react';

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

  return (
    <div className="min-h-screen font-sans">
      {/* Header Section */}
      <div className="text-center py-10">
        <h1 className="text-4xl font-bold">Contact Us</h1>
      </div>

      {/* Contact Section */}
      <div className="max-w-7xl mx-auto p-6 flex flex-col md:flex-row gap-10">
        {/* Contact Form */}
        <div className="md:w-1/2 bg-gray-200 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-gray-700 mb-6">Get In Touch</h2>
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Name"
              className="p-3 bg-gray-300 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Email"
              className="p-3 bg-gray-300 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Type Here..."
              rows="4"
              className="p-3 bg-gray-300 rounded-3xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button
              type="submit"
            >
              Send Now
            </Button>
          </form>
        </div>

        {/* Contact Info Section */}
        <div className="md:w-1/2 flex flex-col gap-8 text-gray-700">
          <p>
            In tempus nisl turpis, at ultricies dui eleifend a. Quisque et quam vel mauris consectetur pharetra euismod
            et eleifend. Nullam orci purus.
          </p>

          <div className="space-y-4">
            <div className="flex items-center">
              <a href="tel:+27114935495" className="mb-2 flex gap-8 hover:text-blue-700">
              <Phone />
              +27 11 493 5495
            </a>            </div>
            <div className="flex items-center">
              <a href="mailto:info@helmtex.co.za?subject=Inquiry%20from%20Website" className="mb-2 flex gap-8 hover:text-blue-700">
              <Mail />
              info@helmtex.co.za
            </a>            </div>
            <div className="flex items-center">
              <a href="tel:+27114935495" className="mb-2 flex gap-8 hover:text-blue-700">
              <MessageCircleMore />
              +27 73 713 9683
            </a>            </div>
            <div className="flex items-center">
              <Link 
              href="https://maps.app.goo.gl/ujC1gntD3jMfKmbT9"
              className="mb-2 flex gap-8 hover:text-blue-700">
              <MapPin />
              33 Fennell Street, New Centre, Johannesburg, 2001
            </Link>            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;