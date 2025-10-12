"use client";
import React, { useState } from "react";
import Image from "next/image";
import HelmLogo from "../../public/images/helm.png";
import { AlignJustify, X } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Nav = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const Links = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Products", link: "/products" },
    { name: "Finishes", link: "/finishes" },
    { name: "Gallery", link: "/gallery" },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="shadow-md w-full fixed top-0 left-0 bg-inherit z-40">
      <div className="md:flex items-center justify-between py-4 md:px-10 px-7">
        {/* Logo */}
        <div className="flex items-center justify-between">
          <div className="font-extrabold text-2xl cursor-pointer">
            <Image
              src={HelmLogo}
              alt="Helm logo"
              className="w-24"
              priority
              quality={100}
              onClick={() => router.push("/")}
            />
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            onClick={toggleMenu}
            className="md:hidden text-2xl focus:outline-none"
            variant="ghost"
          >
            {isOpen ? <X /> : <AlignJustify />}
          </Button>
        </div>

        {/* Links */}
        <ul
          className={`md:flex md:items-center md:static absolute bg-white md:bg-transparent w-full md:w-auto left-0 md:pl-0 pl-9 transition-all duration-500 ease-in ${
            isOpen ? "top-16" : "top-[-490px]"
          }`}
        >
          {Links.map((link, i) => (
            <li key={i} className="md:ml-8 text-lg md:my-0 my-4">
              <Link
                href={link.link}
                className="text-gray-800 hover:text-blue-700 transition duration-300"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            </li>
          ))}

          {/* CTA Button */}
          <li className="md:ml-8 text-lg md:my-0 my-4">
            <Button
              asChild
              onClick={() => setIsOpen(false)}
                  className="bg-blue-500/80 hover:bg-blue-500 text-white rounded-xl"
            >
              <Link href="/contacts">Contact Us</Link>
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
