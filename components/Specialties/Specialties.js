import React from "react";
import Image from "next/image";
import img from "../../public/assets/img9.JPG";

const Specialties = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-8 md:p-16 bg-white gap-8">
      {/* Image Section */}
      <div className="md:w-1/2 w-full relative aspect-square">
        <Image
          src={img}
          alt="background"
          fill
          priority
          quality={100}
          className="rounded-2xl object-cover"
        />
      </div>

      {/* Text Content */}
      <div className="md:w-1/2 w-full">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6">
          Our Specialties.
        </h1>
        <p className="text-lg text-gray-600 italic mb-6">
          At Helm Textile Mills, we specialize in delivering a diverse range of
          high-quality textile solutions tailored to meet the needs of various
          industries and applications. Our expertise includes:
        </p>
        <p>
          <span className="font-semibold text-gray-800">Contract Textiles</span>
          <br />
          We provide premium fabrics for commercial spaces such as offices,
          hotels, auditoriums, and cinemas. Designed for durability and style,
          our contract textiles are perfect for creating comfortable,
          professional, and inviting environments that leave a lasting
          impression.
        </p>
        <br />
        <p>
          <span className="font-semibold text-gray-800">Domestic Décor</span>
          <br />
          Our stunning range of upholstery, curtaining, throws, and cushions is
          crafted to enhance the beauty and comfort of homes. Whether
          you&apos;re looking for timeless elegance or contemporary designs, we
          offer fabrics that bring your interior décor vision to life.
        </p>
        <br />
        <p>
          <span className="font-semibold text-gray-800">
            Automotive Upholstery
          </span>
          <br />
          From seat covers to interior linings, we manufacture specialized
          fabrics for the automotive industry. Our products are engineered to
          deliver superior performance, durability, and aesthetic appeal,
          ensuring vehicles combine comfort with luxury.
        </p>
        <br />
        <p>
          <span className="font-semibold text-gray-800">Outdoor Fabrics</span>
          <br />
          For outdoor applications, we offer weather-resistant textiles designed
          to withstand the elements without compromising on style or quality.
          Perfect for furniture, awnings, and more, our outdoor fabrics are
          durable, functional, and visually striking.
        </p>
        <br />
        <p>
          <span className="font-semibold text-gray-800">Bedding Solutions</span>
          <br />
          We produce high-quality bedding fabrics that promote comfort and
          relaxation. From soft, breathable sheets to cozy, stylish covers, our
          bedding textiles are crafted to ensure restful nights and elegant
          bedroom aesthetics.
        </p>
        <br />
        <p>
          At Helm Textile Mills, our specialization reflects our commitment to
          versatility, innovation, and excellence. Whatever your textile needs,
          we have the expertise and resources to deliver products that exceed
          expectations.
        </p>
      </div>
    </div>
  );
};

export default Specialties;
