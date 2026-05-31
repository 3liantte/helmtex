"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import backgroundImage from "../../public/assets/about.jpg";
import displayImage from "../../public/assets/loom.jpg";
import displayImage2 from "../../public/assets/img7.png";
import { useRouter } from "next/navigation";
import { BadgeCheck, Layers } from "lucide-react";
import Counter from "../../components/ui/Counter";


const productNames = [
  "Cotton Twill Fabric",
  "Polyester Blend",
  "Linen Look Fabric",
  "Eco-friendly Textiles",
  "Outdoor Upholstery",
  "Heavy Duty Canvas",
  "Lightweight Voile",
  "Denim Collection",
  "Curtain Fabrics",
  "Fire Retardant Textiles",
  "Waterproof Materials",
  "Velvet Upholstery",
  "Jacquard Fabrics",
  "Fleece and Knits",
  // ... add more names!
];

const AboutPage = () => {
  const router = useRouter();
  const [isPaused, setIsPaused] = useState(false);
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);
  const handleContact = () => router.push("/contacts");


  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="relative w-full h-[30rem] overflow-hidden">
        <Image
          src={backgroundImage}
          alt="Background"
          fill
          className="object-cover w-full h-full"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold z-10">
            About Us
          </h1>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center gap-10">
          <div className="w-full sm:w-1/2">
            <div className="relative w-full h-80 sm:h-[400px] rounded-lg shadow-lg overflow-hidden">
              <Image
                src={displayImage2}
                alt="Loom"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
          </div>
          <div className="w-full sm:w-1/2">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">
              Helm Textile Mills since 1992
            </h2>
            <p className="text-gray-600 mb-6">
              At <span className="font-medium">Helm Textile Mills</span>, we have been a trusted leader in the textile manufacturing industry for over 29 years. Since our inception, we have been dedicated to producing high-quality fabrics that meet the diverse needs of our clients. Our commitment to excellence, innovation, and sustainability has earned us a reputation for reliability and craftsmanship.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
              <Counter end={29} label="Years of Experience" icon={<BadgeCheck size={28} />} />
              <Counter end={450} label="Product Variants" icon={<Layers size={28} />} />
              {/* <Counter end={12} label="Export Countries" icon={<Globe2 size={28} />} /> */}
            </div>
          </div>
        </div>
      </section>
      {/* Why Choose Us */}
      <section className="py-16 px-6">
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Why Choose Us
          </h2>
          <p className="text-gray-600">
            With an extensive inventory of high-quality fabrics, competitive wholesale pricing, and immediate availability, we empower businesses to meet their production timelines without hassle.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {["Fast Building", "Smartly Execute", "Carefully Planned", "Perfect Design"].map((title, idx) => (
            <div key={idx} className="bg-white shadow-md p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
              <p className="text-gray-600 mt-2">
                {title === "Fast Building"
                  ? "At Helm Textile, we pride ourselves on our efficient production process, built over 29 years of industry experience."
                  : title === "Smartly Execute"
                  ? "With a focus on smart manufacturing and cutting-edge technology, we execute each project with utmost care and precision."
                  : title === "Carefully Planned"
                  ? "Every aspect of our textile production is meticulously planned. We work closely with our clients to ensure that every product is tailored to their specific needs."
                  : "At Helm Textiles, we believe that great design is the foundation of every great textile product."}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Trusted by Industry Leaders
          </h2>
        </div>

        {/* Product Marquee */}
        <div
          className="relative flex overflow-hidden mt-8"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {[1, 2].map((i) => (
            <div
              key={i}
              className={`flex space-x-8 w-fit animate-marquee ${
                isPaused ? "pause-marquee" : ""
              }`}
            >
              {productNames.map((name, index) => (
                <div
                  key={`${i}-${index}`}
                  className="flex items-center justify-center px-8 whitespace-nowrap text-gray-700 text-lg font-medium hover:text-blue-600 transition duration-300"
                >
                  {name}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Craftsmanship */}
      <section className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-semibold text-gray-800">Innovative Craftsmanship</h3>
            <p className="text-gray-600 mt-4">
              Deep in the heart of the textile world, where creativity and precision intertwine, we bring fabrics to life.
            </p>
            <p className="mt-4 text-gray-600">
              Our dedication to quality and sustainability shapes each thread, creating textiles that stand the test of time.
            </p>
            <div className="mt-6">
              <h4 className="text-xl font-bold text-gray-800">Wilhelm Lochmann</h4>
              <p className="text-gray-600">CEO</p>
            </div>
          </div>

          <div className="relative w-full h-80 sm:h-[400px] rounded-xl shadow-md overflow-hidden">
            <Image
              src={displayImage}
              alt="Interior Design"
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
            <div className="absolute bottom-0 left-0 bg-white shadow-md p-4 rounded-lg m-4">
              <p className="italic text-gray-600">
                &quot;We weave the fabric of innovation, where quality, craftsmanship, and sustainability meet to create timeless textiles.&quot;
              </p>
              <p className="mt-2 text-gray-800 font-bold">Wilhelm L.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="bg-[#00378b] py-10 text-white">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6 px-6">
          <h3 className="text-2xl font-bold text-center sm:text-left">
            Ready to Turn Your Designs into Reality?
          </h3>
          <Button
            className="bg-yellow-500 hover:bg-yellow-400 text-gray-800 font-bold"
            onClick={handleContact}
          >
            Contact Us
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
