import { Facebook, Instagram, Mail, MapPin, MessageCircle, MessageCircleMore, Phone } from 'lucide-react';
import React from 'react';
import Image from 'next/image';
import HelmLogo from "@/public/images/helm2.png";
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-[#00378b] text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Reservations Office Section */}
          <div className="border border-white p-6 rounded-lg">
            <h3 className="text-lg sm:text-xl font-semibold mb-4">Reservations Office</h3>
            <Link 
              href="https://maps.app.goo.gl/ujC1gntD3jMfKmbT9"
              className="mb-2 flex gap-8">
              <MapPin />
              33 Fennell Street, New Centre, Johannesburg, 2001
            </Link>
            {/* Phone number with tel: protocol */}
            <a href="tel:+27114935495" className="mb-2 flex gap-8">
              <Phone />
              +27 11 493 5495
            </a>
            {/* Email with mailto: protocol and subject */}
            <a href="mailto:info@helmtex.co.za?subject=Inquiry%20from%20Website" className="mb-2 flex gap-8">
              <Mail />
              info@helmtex.co.za
            </a>
            <div className="flex space-x-4 mt-4 gap-4">
              <a href="https://facebook.com" aria-label="Facebook" className="hover:text-gray-200">
                <Facebook />
              </a>
              <a href="https://twitter.com" aria-label="Twitter" className="hover:text-gray-200">
                <MessageCircleMore />
              </a>
              <a href="https://instagram.com" aria-label="Instagram" className="hover:text-gray-200">
                <Instagram />
              </a>
            </div>
          </div>

          {/* Office Hours Section */}
          <div className="border border-white p-6 rounded-lg">
            <h3 className="text-lg sm:text-xl font-semibold mb-4">Office Hours</h3>
            <p className="mb-2"><span className="font-semibold">Monday - Thursday</span><br />7:00 am to 4:30 pm</p>
            <p className="mb-2"><span className="font-semibold">Friday</span> <br/> 07:00 am to 3:30pm</p>
            <p><span className="font-semibold">Saturday - Sunday</span><br />Closed</p>
          </div>

          {/* Get Social Section */}
          <div className="border border-white p-6 rounded-lg flex justify-center">
            <Image
              src={HelmLogo}
              alt="Helm Logo"
              className="w-full max-w-[200px]"
            />
          </div>
        </div>

        {/* Copyright Notice */}
        <div className="text-center border-t border-gray-700 pt-8 mt-8">
          <p>Copyright &copy; {new Date().getFullYear()} Helmtex. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
