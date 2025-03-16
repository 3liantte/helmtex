import React from "react";
import Image from "next/image";
import backgroundImage from "../../public/assets/background2.JPG";

const reviews = [
  {
    text: "Helm Textile Mills has been a game-changer for our business. Their commitment to quality and timely delivery has exceeded our expectations. The fabrics we source from them are top-notch and have significantly improved our product line. We couldn't ask for a better partner in the textile industry!",
    author: "Emily R., Fashion Designer",
  },
  {
    text: "I've been sourcing fabrics from Helm Textile Mills for years, and they have never let me down. The team is knowledgeable, responsive, and always willing to go the extra mile to ensure we get exactly what we need. Their attention to detail and focus on sustainability make them stand out in the market.",
    author: "David M., Home Furnishings Manufacturer",
  },
  {
    text: "What sets Helm Textile Mills apart is their ability to innovate while maintaining high standards of quality. Their fabrics are not only durable but also beautifully designed, making them perfect for our needs. Their customer service is exceptional, and I can always rely on them to deliver on time.",
    author: "Sophia L., Automotive Upholstery Specialist",
  },
];

const Reviews = () => {
  return (
    <div className="relative flex items-center justify-center min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={backgroundImage}
          alt="Background"
          layout="fill"
          objectFit="cover"
          priority
          className="w-full h-full"
        />
        <div className="absolute inset-0 bg-gray-800 bg-opacity-50" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 sm:py-16 md:py-20 lg:py-24">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white md:mb-24">
          What Our Customers Say About Us!
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-[#00378b] shadow-lg p-6 sm:p-8 rounded-lg h-auto flex flex-col justify-between"
            >
              <p className="italic text-gray-100 mb-4">
                &quot;{review.text}&quot;
              </p>
              <p className="text-right font-semibold text-gray-100 mt-4">
                {review.author}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
