"use client";
import React from "react";
import Image from "next/image";
import img3 from "../../public/assets/img3.JPG";

const InfoSection = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-8 md:p-16 bg-gray-100 gap-8 md:gap-16">
      {/* Text Content */}
      <div className="md:w-1/2 w-full">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6">
          Welcome to Helm Textile Mills, where craftsmanship meets innovation.
        </h1>
        <p className="text-lg text-gray-600 italic mb-6">
          Since 1992, we have been dedicated to producing high-quality textiles
          that cater to diverse industries and unique client needs. With nearly
          three decades of expertise, our commitment to excellence,
          sustainability, and customer satisfaction has made us a trusted name
          in the textile manufacturing world. At Helm, we blend state-of-the-art
          technology with a passion for creating fabrics that inspire and
          endure. Whether you&apos;re seeking custom designs, bulk production,
          or tailored solutions, we are here to turn your vision into reality.
        </p>
        <p className="text-gray-600 mb-4">
          At Helm Textile Mills, we take pride in being more than just a textile
          manufacturer. Our legacy is built on fostering strong relationships
          with our clients by understanding their unique needs and delivering
          tailored solutions that exceed expectations. From fashion and home
          décor to automotive and industrial fabrics, our diverse portfolio
          reflects our versatility and unwavering commitment to quality. With
          cutting-edge equipment and a team of skilled professionals, we ensure
          every thread is crafted to perfection, combining durability, style,
          and functionality in every product we deliver.
        </p>
        <p className="text-gray-600">
          Sustainability is at the heart of everything we do. We are dedicated
          to minimizing our environmental impact by adopting eco-friendly
          practices and responsibly sourcing materials. At Helm Textile Mills,
          we don&apos;t just create textiles; we create opportunities for a
          better future for our clients, employees, and the planet. As we
          continue to grow, we remain steadfast in our mission to innovate,
          inspire, and deliver textiles that stand the test of time. Together,
          let&apos;s weave a legacy of quality and trust.
        </p>
      </div>

      {/* Image Section */}
      <div className="md:w-1/2 w-full relative aspect-square">
        <Image
          src={img3}
          alt="background"
          fill
          priority={true}
          quality={100}
          className="rounded-2xl object-cover"
        />
      </div>
    </div>
  );
};

export default InfoSection;
