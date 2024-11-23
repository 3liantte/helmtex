"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import HelmLogo from '@/public/images/helm.png';
import { AlignJustify, X } from 'lucide-react';
import { Button } from '../ui/button';

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);

    const Links = [
        { name: "Home", link: "/" },
        { name: "About", link: "/about" },
        { name: "Products", link: "/products" },
        { name: "Blog", link: "/blog" },
        { name: "Contact Us", link: "/contacts" },
        { name: "FAQ", link: "/faq" },
    ];

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="shadow-md w-full fixed top-0 left-0 bg-inherit z-40">
            <div className="md:flex items-center justify-between py-4 md:px-10 px-7">
                <div className="flex items-center justify-between">
                    <div className="font-extrabold text-2xl cursor-pointer">
                        <Image
                            src={HelmLogo}
                            alt="Helm logo"
                            className="w-24"
                            priority={true}
                            quality={100}
                            onClick={() => window.location = '/'}
                        />
                    </div>
                    <Button
                        onClick={toggleMenu}
                        className="md:hidden text-2xl focus:outline-none"
                    >
                        {isOpen ? <X /> : <AlignJustify />}
                    </Button>
                </div>
                <ul
                    className={`md:flex md:items-center md:static absolute bg-white w-full md:w-auto left-0 md:pl-0 pl-9 transition-all duration-500 ease-in ${
                        isOpen ? 'top-16' : 'top-[-490px]'
                    }`}
                >
                    {Links.map((link, i) => (
                        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                        <li key={i} className="md:ml-8 text-lg md:my-0 my-4">
                            <a
                                href={link.link}
                                className="text-gray-800 hover:text-blue-700 transition duration-300"
                                onClick={() => setIsOpen(false)} // Close menu on click
                            >
                                {link.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Nav;
