import React from "react";
import Footer from "../Footer/Footer";
import { Facebook, Instagram, Mail, MapPin, MessageCircleMore, Phone } from "lucide-react";
import Link from "next/link";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const ContactPage = () => {
  return (
    <div className="flex flex-col items-center justify-between pt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
        {/* Contact Information */}
        <div className="bg-[#00378b] text-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <p className="mb-6">Say something to start a live chat!</p>
          <div className="space-y-4">
            <div className="flex items-center">
            <a href="tel:+27114935495" className="mb-2 flex gap-8 hover:text-blue-500">
                <Phone />
                +27 11 493 5495
              </a>
            </div>
            <div className="flex items-center">
            <a href="mailto:info@helmtex.co.za?subject=Inquiry%20from%20Website" className="mb-2 flex gap-8 hover:text-blue-500">
              <Mail />
              info@helmtex.co.za
            </a>
            </div>
            <div className="flex items-center">
            <Link 
                href="https://maps.app.goo.gl/ujC1gntD3jMfKmbT9"
                className="flex gap-8 hover:text-blue-500">
                <MapPin />
                <h4 className="flex-1 items-center justify-center">33 Fennell Street, New Centre, Johannesburg, 2001</h4> 
              </Link>
            </div>
          </div>
          <div className="flex mt-6 space-x-6 pt-36">
            {/* Social Icons */}
            <a href="https://web.facebook.com/p/Helm-Textile-Mills-61559102703086/?_rdc=1&_rdr" aria-label="Facebook" className="hover:text-blue-500">
              <Facebook/>
            </a>
            <a href="https://wa.me/+27824520560" aria-label="Whatsapp" className="hover:text-blue-500">
              <MessageCircleMore/>
            </a>
            <a href="https://www.instagram.com/helm_textiles/" aria-label="Instagram" className="hover:text-blue-500">
              <Instagram/>
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white border border-[#00378b] p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="mb-6">Any questions or remarks? Just write us a message!</p>
          <form>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Input
                type="text"
                placeholder="First Name"
              />
              <Input
                type="text"
                placeholder="Last Name"
              />
              <Input
                type="email"
                placeholder="Email"
                required
              />
              <Input
                type="text"
                placeholder="Phone Number"
                required
              />
            </div>
            <div className="mb-4">
              <Label className="block text-gray-700 mb-2">Select Subject:</Label>
              <div className="flex space-x-4">
                <Label>
                  <input
                    type="radio"
                    name="subject"
                    className="mr-2"
                  />
                  General Inquiry
                </Label>
                <Label>
                  <input
                    type="radio"
                    name="subject"
                    className="mr-2"
                  />
                  Feedback
                </Label>
                <Label>
                  <input
                    type="radio"
                    name="subject"
                    className="mr-2"
                  />
                  Support
                </Label>
              </div>
            </div>
            <div className="mb-6">
              <Textarea
                placeholder="Write your message..."
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
              ></Textarea>
            </div>
            <Button
              type="submit"
              className="bg-[#00378b] text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Send Message
            </Button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-10 w-full">
        <Footer/>
      </div>
    </div>
  );
};

export default ContactPage;