"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import backgroundImage from "../../public/assets/background.png";
import displayImage from "../../public/assets/img2.JPG";
import displayImage2 from "../../public/assets/img7.JPG";

const logos = [
  { src: "/images/Custom.png", alt: "Helm Textile Mills Logo" },
  { src: "/images/Diamond.png", alt: "Weavers World Logo" },
  { src: "/images/Domestic.png", alt: "The Mill logo"},
  { src: "/images/GreatOutdoor.png", alt: "Ulrich Seats logo"},
  { src: "/images/WorkRange.png", alt: "City Lodge Hotels logo"},
  { src: "/images/GreatPlains.png", alt: "St Ledger & Viney logo"},
  { src: "/images/ScapeRange.png", alt: "Concept Africa logo"},
  { src: "/images/SlubPlain.png", alt: "Africa Business logo"},  
  { src: "/images/StudioExplore.png", alt: "Planet Seating logo"}, 
  { src: "/images/TailorRange.png", alt: "Malondie logo"}, 
  { src: "/images/StudioRange.png", alt: "MaXhosa logo"},
  { src: "/images/ValleyRange.png", alt: "MaXhosa logo"},
  { src: "/images/WestCliff.png", alt: "MaXhosa logo"},

  { src: "/images/helm.png", alt: "Helm Textile Mills Logo" },
  { src: "/images/weavers.png", alt: "Weavers World Logo" },
  { src: "/images/themill.png", alt: "The Mill logo" },
  { src: "/images/ulrich.png", alt: "Ulrich Seats logo" },
  { src: "/images/citylodge.png", alt: "City Lodge Hotels logo" },
  { src: "/images/stledger.png", alt: "St Ledger & Viney logo" },
  { src: "/images/concept.png", alt: "Concept Africa logo" },
  { src: "/images/africa.png", alt: "Africa Business logo" },
  { src: "/images/planet.png", alt: "Planet Seating logo" },
  { src: "/images/malondie.png", alt: "Malondie logo" },
  { src: "/images/maxhosa.png", alt: "MaXhosa logo" },
  {
    /* more logos*/
  },
];

const AboutPage = () => {
  const [isPaused, setIsPaused] = useState(false);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <div className="font-sans">
      <section className="relative h-[30rem] flex items-center">
        <Image
          src={backgroundImage}
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority={true}
          className="rounded-lg shadow-lg w-full sm:w-auto"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 mx-auto text-center text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            About Us
          </h1>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-16 px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center">
          <div className="w-full sm:w-1/2 pr-14">
            <div className="relative w-full h-80 sm:h-[400px] rounded-lg shadow-lg overflow-hidden">
              <Image
                src={displayImage2}
                alt="Interior Design"
                quality={100}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                priority={true}
                className="object-cover"
              />
            </div>
          </div>
          <div className="w-full sm:w-1/2 sm:pl-8 mt-6 sm:mt-0">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">
              Helm Textile Mills since 1992
            </h2>
            <p className="text-gray-600 mb-6">
              At <span className="font-medium">Helm Textile Mills</span>, we
              have been a trusted leader in the textile manufacturing industry
              for over 29 years. Since our inception, we have been dedicated to
              producing high-quality fabrics that meet the diverse needs of our
              clients. Our commitment to excellence, innovation, and
              sustainability has earned us a reputation for reliability and
              craftsmanship. Choose{" "}
              <span className="font-medium">Helm Textile Mills</span> for
              unparalleled expertise, precision, and a commitment to excellence
              that spans nearly three decades.
            </p>
            <div className="flex space-x-8">
              <div>
                <p className="text-4xl font-bold text-gray-800">29+</p>
                <p className="text-gray-600">Years of Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Why Choose Us
          </h2>
          <p className="text-gray-600 mb-6">
            With an extensive inventory of high-quality fabrics, competitive
            wholesale pricing, and immediate availability, we empower businesses
            to meet their production timelines without hassle. Our strategically
            located warehouse ensures timely delivery, and our experienced team
            is committed to providing exceptional service and tailored solutions
            for your business.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800">
              Fast Building
            </h3>
            <p className="text-gray-600 mt-2">
              At Helm Textile, we pride ourselves on our efficient production
              process, built over 29 years of industry experience.
            </p>
          </div>

          <div className="bg-white shadow-md p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800">
              Smartly Execute
            </h3>
            <p className="text-gray-600 mt-2">
              With a focus on smart manufacturing and cutting-edge technology,
              we execute each project with utmost care and precision.
            </p>
          </div>

          <div className="bg-white shadow-md p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800">
              Carefully Planned
            </h3>
            <p className="text-gray-600 mt-2">
              Every aspect of our textile production is meticulously planned. We
              work closely with our clients to ensure that every product is
              tailored to their specific needs.
            </p>
          </div>

          <div className="bg-white shadow-md p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800">
              Perfect Design
            </h3>
            <p className="text-gray-600 mt-2">
              At Helm Textiles, we believe that great design is the foundation
              of every great textile product.
            </p>
          </div>
        </div>

        {/* Logos */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mt-4">
            Trusted by Industry Leaders
          </h2>
        </div>
        <div
          className="relative flex overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className={`flex space-x-8 w-fit animate-marquee ${
              isPaused ? "pause-marquee" : ""
            }`}
          >
            {logos.concat(logos).map((logo, index) =>
              logo.src ? (
                <div
                  key={index}
                  className="w-24 h-24 flex items-center justify-center overflow-hidden group"
                >
                  <Image
                    src={logo.src}
                    width={100}
                    height={100}
                    alt={logo.alt}
                    quality={100}
                    priority={true}
                    className="object-contain filter grayscale group-hover:grayscale-0 transition duration-300"
                  />
                </div>
              ) : null
            )}
          </div>
          <div
            className={`flex space-x-8 w-fit animate-marquee ${
              isPaused ? "pause-marquee" : ""
            }`}
          >
            {logos.concat(logos).map((logo, index) =>
              logo.src ? (
                <div
                  key={index}
                  className="w-24 h-24 flex items-center justify-center overflow-hidden group"
                >
                  <Image
                    src={logo.src}
                    width={100}
                    height={100}
                    alt={logo.alt}
                    quality={100}
                    priority={true}
                    className="object-contain filter grayscale group-hover:grayscale-0 transition duration-300"
                  />
                </div>
              ) : null
            )}
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800">
              Innovative Craftsmanship
            </h3>
            <p className="text-gray-600 mt-4">
              Deep in the heart of the textile world, where creativity and
              precision intertwine, we bring fabrics to life.
            </p>
            <p className="mt-4 text-gray-600">
              Our dedication to quality and sustainability shapes each thread,
              creating textiles that stand the test of time.
            </p>
            <div className="mt-6">
              <h4 className="text-xl font-bold text-gray-800">
                Wilhelm Lochmann
              </h4>
              <p className="text-gray-600">CEO</p>
            </div>
          </div>

          {/* Right Content */}
          <div className="relative w-full h-80 sm:h-[400px] rounded-xl shadow-md overflow-hidden">
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
                &quot;We weave the fabric of innovation, where quality,
                craftsmanship, and sustainability meet to create timeless
                textiles.&quot;
              </p>
              <p className="mt-2 text-gray-800 font-bold">Wilhelm L.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Footer */}
      <footer className="bg-[#00378b] py-8 text-white">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center pl-4 pr-4">
          <h3 className="text-2xl font-bold">
            Ready to Turn Your Designs into Reality?
          </h3>
          <Button
            className="bg-yellow-500 hover:bg-yellow-300 text-gray-800 font-bold mt-4"
            onClick={() => (window.location = "/contacts")}
          >
            Contact Us
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
