import {
  Facebook,
  Instagram,
  Mail,
  MapIcon,
  MapPin,
  MessageCircle,
  MessageCircleMore,
  Phone,
} from "lucide-react";
import { MdOutlineEmail } from "react-icons/md";
import React from "react";
import Image from "next/image";
import HelmLogo from "../../public/images/helm2.png";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

const Links = [
  { name: "Home", link: "/" },
  { name: "About", link: "/about" },
  { name: "Products", link: "/products" },
  { name: "Blog", link: "/blog" },
  { name: "Contact Us", link: "/contacts" },
  { name: "FAQ", link: "/faq" },
];

const Footer = () => {
  return (
    <footer className="bg-[#00378b] text-white py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-5 md:gap-24 gap-8">
        {/* Logo Section */}
        <div className="col-span-1">
          <Image
            src={HelmLogo}
            alt="Helm Logo"
            className="w-full max-w-[200px]"
            priority={true}
            quality={100}
          />
        </div>

        {/* Reach Us Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Reach us</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center">
              <a
                href="tel:+27114935495"
                className="mb-2 flex gap-8 hover:text-blue-500"
              >
                <Phone />
                +27 11 493 5495
              </a>
            </li>
            <li className="flex items-center">
              <a
                href="mailto:info@helmtex.co.za?subject=Inquiry%20from%20Website"
                className="mb-2 flex gap-8 hover:text-blue-500"
              >
                <MdOutlineEmail size={26}/>
                info@helmtex.co.za
              </a>
            </li>
            <li className="flex items-start">
              <Link
                href="https://maps.app.goo.gl/ujC1gntD3jMfKmbT9"
                className="flex gap-8 hover:text-blue-500"
              >
                <MapPin />
                <h4 className="flex-1 items-center justify-center">
                  33 Fennell Street, New Centre, Johannesburg, 2001
                </h4>
              </Link>
            </li>
          </ul>
        </div>

        {/* Company Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="\about" className="hover:text-blue-500 hover:underline">
                About
              </a>
            </li>
            <li>
              <a
                href="\contacts"
                className="hover:text-blue-500 hover:underline"
              >
                Contact
              </a>
            </li>
            <li>
              <a href="\blog" className="hover:text-blue-500 hover:underline">
                Blog
              </a>
            </li>
          </ul>
        </div>

        {/* Legal Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/privacy-policy" legacyBehavior>
                <a className="hover:text-blue-500 hover:underline">
                  Privacy Policy
                </a>
              </Link>
            </li>
            <li>
              <Link href="/terms-services" legacyBehavior>
                <a className="hover:text-blue-500 hover:underline">
                  Terms & Services
                </a>
              </Link>
            </li>
            <li>
              <Link href="/terms-of-use" legacyBehavior>
                <a className="hover:text-blue-500 hover:underline">
                  Terms of Use
                </a>
              </Link>
            </li>
            <li>
              <Link href="/refund-policy" legacyBehavior>
                <a className="hover:text-blue-500 hover:underline">
                  Refund Policy
                </a>
              </Link>
            </li>
          </ul>
        </div>

        {/* Quick Links Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Social Media</h3>
          <div className="flex space-x-4 mt-4 gap-2">
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
      </div>
    </footer>
  );
};

export default Footer;
