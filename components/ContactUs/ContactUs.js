"use client";

import React from "react";
import Footer from "../Footer/Footer";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { toast } from "../../components/ui/sonner";
import { useState } from "react";

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (e) => {
    setFormData((prev) => ({ ...prev, subject: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        // Handle case where response is not valid JSON
        throw new Error("Failed to parse response");
      }

      if (response.ok) {
        alert("Thank you for your message. We'll get back to you soon!");
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          subject: "General Inquiry",
          message: "",
        });
      } else {
        throw new Error(
          data && data.error ? data.error : "Failed to send message"
        );
      }
    } catch (error) {
      console.error("Contact form error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between pt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
        {/* Contact Information */}
        <div className="bg-[#00378b] text-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <p className="mb-6">Say something to start a live chat!</p>
          <div className="space-y-4">
            <div className="flex items-center">
              <a
                href="tel:+27114935495"
                className="mb-2 flex gap-8 hover:text-blue-500"
              >
                <Phone />
                +27 11 493 5495
              </a>
            </div>
            <div className="flex items-center">
              <a
                href="mailto:info@helmtex.co.za?subject=Inquiry%20from%20Website"
                className="mb-2 flex gap-8 hover:text-blue-500"
              >
                <Mail />
                info@helmtex.co.za
              </a>
            </div>
            <div className="flex items-center">
              <Link
                href="https://maps.app.goo.gl/ujC1gntD3jMfKmbT9"
                className="flex gap-8 hover:text-blue-500"
              >
                <MapPin />
                <h4 className="flex-1 items-center justify-center">
                  33 Fennell Street, New Centre, Johannesburg, 2001
                </h4>
              </Link>
            </div>
          </div>
          <div className="flex mt-6 space-x-6 pt-36">
            {/* Social Icons */}
            <a
              href="https://web.facebook.com/p/Helm-Textile-Mills-61559102703086/?_rdc=1&_rdr"
              aria-label="Facebook"
              className="hover:text-blue-500"
            >
              <FaFacebook size={26}/>
            </a>
            <a
              href="https://wa.me/+27739660936"
              aria-label="Whatsapp"
              className="hover:text-blue-500"
            >
              <FaWhatsapp size={26}/>
            </a>
            <a
              href="https://www.instagram.com/helm_textiles/"
              aria-label="Instagram"
              className="hover:text-blue-500"
            >
              <FaInstagram size={26}/>
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white border border-[#00378b] p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="mb-6">
            Any questions or remarks? Just write us a message!
          </p>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
              />
              <Input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
              />
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
              <Input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                required
              />
            </div>
            <div className="mb-4">
              <Label className="block text-gray-700 mb-2">
                Select Subject:
              </Label>
              <div className="flex space-x-4">
                <Label>
                  <input
                    type="radio"
                    name="subject"
                    value="General Inquiry"
                    checked={formData.subject === "General Inquiry"}
                    onChange={handleRadioChange}
                    className="mr-2"
                  />
                  General Inquiry
                </Label>
                <Label>
                  <input
                    type="radio"
                    name="subject"
                    value="Feedback"
                    checked={formData.subject === "Feedback"}
                    onChange={handleRadioChange}
                    className="mr-2"
                  />
                  Feedback
                </Label>
                <Label>
                  <input
                    type="radio"
                    name="subject"
                    value="Support"
                    checked={formData.subject === "Support"}
                    onChange={handleRadioChange}
                    className="mr-2"
                  />
                  Support
                </Label>
              </div>
            </div>
            <div className="mb-6">
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message..."
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                required
              ></Textarea>
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#00378b] text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-10 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default ContactPage;
