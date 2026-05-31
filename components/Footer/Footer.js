import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, Facebook, Instagram } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import HelmLogo from "../../public/images/helm2.png";

const FooterSection = ({ title, children }) => (
  <div className="space-y-4">
    <h4 className="text-xl font-bold text-white border-b border-blue-600 pb-2">
      {title}
    </h4>
    {children}
  </div>
);

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#00378b] to-[#1a5ac4] text-white py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Logo and Description */}
        <div className="space-y-6 col-span-1">
          <Image
            src={HelmLogo}
            alt="Helm Textile Logo"
            width={250}
            height={100}
            className="filter brightness-0 invert mb-4"
          />
          <p className="text-gray-200 text-sm leading-relaxed">
            Helm Textile Mills: Innovating textile solutions with quality,
            sustainability, and customer-centric approach.
          </p>
        </div>

        {/* Quick Links */}
        <FooterSection title="Quick Links">
          <ul className="space-y-3">
            {[
              { name: "Home", href: "/" },
              { name: "About Us", href: "/about" },
              {name: "Blogs", href:"/blog"},
              { name: "Products", href: "/products" },
              { name: "Finishes", href: "/finishes" },
              { name: "Contact", href: "/contacts" },
            ].map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-blue-300 hover:pl-2"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </FooterSection>

        {/* Contact Information */}
        <FooterSection title="Contact Us">
          <ul className="space-y-4">
            <li className="flex items-center space-x-3">
              <Phone className="text-blue-300" size={20} />
              <a
                href="tel:+27114935495"
                className="hover:text-blue-300 transition-colors"
              >
                +27 11 493 5495
              </a>
            </li>
            <li className="flex items-center space-x-3">
              <Mail className="text-blue-300" size={20} />
              <a
                href="mailto:info@helmtex.co.za"
                className="hover:text-blue-300 transition-colors"
              >
                info@helmtex.co.za
              </a>
            </li>
            <li className="flex items-start space-x-3">
              <MapPin className="text-blue-300" size={20} />
              <address className="not-italic text-sm">
                33 Fennell Street, New Centre, Johannesburg, 2001, South Africa
              </address>
            </li>
          </ul>
        </FooterSection>

        {/* Legal and Social */}
        <FooterSection title="Connect & Policies">
          <div className="space-y-4">
            <div className="flex space-x-6">
              <a
                href="https://web.facebook.com/p/Helm-Textile-Mills-61559102703086/"
                className="hover:text-blue-300 transition-transform hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://www.instagram.com/helm_textiles/"
                className="hover:text-blue-300 transition-transform hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://wa.me/+27739660936"
                className="hover:text-blue-300 transition-transform hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp size={24} />
              </a>
            </div>

            <ul className="space-y-2 text-sm">
              {[
                { name: "Privacy Policy", href: "/privacy" },
                { name: "Terms of Service", href: "/terms" },
                // { name: "Refund Policy", href: "/refund" },
              ].map((policy) => (
                <li key={policy.name}>
                  <Link
                    href={policy.href}
                    className="hover:text-blue-300 transition-colors"
                  >
                    {policy.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </FooterSection>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-blue-700 mt-12 py-6 text-center">
        <p className="text-sm text-gray-300">
          © {new Date().getFullYear()} Helm Textile Mills. All Rights Reserved.
        </p>
        {/* <p className="text-sm text-gray-300">
          Made with <span className="text-lg text-red-600">❤</span> {" "}
          <a
            href="https://koketso-portfolio.vercel.app/"
            className="text-blue-300 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            @eliantte
          </a>
        </p> */}
      </div>
    </footer>
  );
};

export default Footer;
