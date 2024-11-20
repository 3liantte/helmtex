'use client';

import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import backgroundImage from "@/public/assets/background.png"
import displayImage from "@/public/assets/img1.png"

const logos = [
    { src: "/images/helm.png", alt: "Helm Logo" },
    { src: "/images/weavers.png", alt: "Weavers Logo" },
    {/* more logos*/}
  ];

const AboutPage = () => {
  return (
    <div className="font-sans">
      <section className="relative h-[400px] flex items-center">
      <Image
        src={backgroundImage}
        alt="Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority={true}
        className='absolute inset-0 -z-10'
      />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 mx-auto text-center text-white">
          <h1 className="text-5xl font-bold">About Us</h1>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-16 px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center">
          <div className="w-full md:w-1/2">
            <Image
              src={displayImage}
              alt="Interior Design"
              quality={100}
              width={400}
              height={400}
              priority={true}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="w-full md:w-1/2 md:pl-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                Helm Textile Mills since 1992
            </h2>
            <p className="text-gray-600 mb-6">
                At <span className="font-medium">Helm Textile Mills</span>, we have been a trusted leader in the textile manufacturing industry for over 29 years. Since our inception, 
                we have been dedicated to producing high-quality fabrics that meet the diverse needs of our clients.
                Our commitment to excellence, innovation, and sustainability has earned us a reputation for reliability and craftsmanship.
                With decades of expertise, we offer a wide range of textile solutions, from custom fabric designs to bulk production, 
                serving various industries including fashion, home textiles, automotive, and more. Our skilled team works with state-of-the-art equipment and sustainable practices
                to deliver products that not only meet but exceed industry standards.
                We pride ourselves on building strong, long-term relationships with our customers, understanding their unique needs, 
                and delivering products that align with their vision. As we continue to evolve and grow, we remain focused on quality, 
                customer satisfaction, and a sustainable future for both our industry and the planet.
                Choose <span className="font-medium">Helm Textile Mills</span> for unparalleled expertise, precision, and a commitment to excellence that spans nearly three decades.
            </p>
            <div className="flex space-x-8">
              <div>
                <p className="text-4xl font-bold text-gray-800">29+</p>
                <p className="text-gray-600">Years of Experience</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-gray-800">26,250+</p>
                <p className="text-gray-600">Woven Fabrics</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-8">
      <div className="text-center mb-10">
      <h2 className="text-3xl font-bold text-gray-800">Why Choose Us</h2>
      <p className="text-gray-600 mb-6">            
         With an extensive inventory of high-quality fabrics, competitive wholesale pricing, and immediate availability, 
        we empower businesses to meet their production timelines without hassle. Our strategically located warehouse ensures timely delivery, 
        and our experienced team is committed to providing exceptional service and tailored solutions for your business. Whether you&apos;re a small 
        business or a large manufacturer, we&apos;ve got you covered.            
        </p>
    </div>

    {/* Feature Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800">Fast Building</h3>
          <p className="text-gray-600 mt-2">
            At Helm Textile, we pride ourselves on our efficient production process, built over 29 years of industry experience. 
            Our advanced manufacturing capabilities allow us to deliver high-quality textile products at a fast pace without compromising on precision or durability.
          </p>
        </div>

        <div className="bg-white shadow-md p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800">Smartly Execute</h3>
          <p className="text-gray-600 mt-2">
            With a focus on smart manufacturing and cutting-edge technology, we execute each project with utmost care and precision. From initial design to final product, 
            our expert team ensures every textile solution is crafted to meet the highest standards of quality and functionality.
          </p>    
        </div>

        <div className="bg-white shadow-md p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800">Carefully Planned</h3>
          <p className="text-gray-600 mt-2">
            Every aspect of our textile production is meticulously planned. Our decades of experience in the textile industry have taught us how to manage resources effectively, 
            streamline processes, and deliver consistent results. We work closely with our clients to ensure that every product is tailored to their specific needs.
          </p>    
          </div>

        <div className="bg-white shadow-md p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800">Perfect Design</h3>
            <p className="text-gray-600 mt-2">
                At Helm Textiles, we believe that great design is the foundation of every great textile product. Our team of designers and engineers 
                work collaboratively to create innovative, 
                functional, and beautiful textiles that stand the test of time.
                From conceptualization to final execution, we deliver products with flawless design and attention to detail.
            </p>
        </div>
    </div>

    {/* Logos */}
    <div className="mt-12 flex justify-center space-x-8">
        {logos.map((logo, index) => (
            logo.src ? (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <div key={index} className="w-24 h-24 overflow-hidden flex items-center justify-center">
                <Image
                src={logo.src}
                width={100}
                height={100}
                alt={logo.alt}
                quality={100}
                priority={true}
                className="object-contain"
                />
            </div>
            ) : null  // Return null if src is empty or invalid
        ))}
    </div>
    </section>

    <section className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
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

            {/* Right Content */}
            <div className="relative">
            <Image
                src={displayImage}
                alt="Interior Design"
                width={600}
                quality={100}
                priority
                className="w-full rounded-lg shadow-lg"
            />
            <div className="absolute bottom-0 left-0 bg-white shadow-md p-4 rounded-lg">
                <p className="italic text-gray-600">
                    "We weave the fabric of innovation, where quality, craftsmanship, and sustainability meet to create timeless textiles."
                </p>
                <p className="mt-2 text-gray-800 font-bold">Wilhelm L.</p>
            </div>
            </div>
        </div>
    </section>


      {/* Call to Action Footer */}
      <footer className="bg-[#00378b] py-8 text-white">
            <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center">
                <h3 className="text-2xl font-bold">Ready to Turn Your Designs into Reality?</h3>
                <Button 
                    className="bg-yellow-500 hover:bg-yellow-300 px-6 py-2 rounded text-gray-800 font-bold"
                    // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
                    onClick={() => window.location = '/contacts'}  // Example link to your contact page
                >
                    Contact Us
                </Button>
            </div>
        </footer>    
    </div>
  );
};

export default AboutPage;
