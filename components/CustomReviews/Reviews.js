import React from 'react';

const reviews = [
  { text: "Helm Textile Mills has been a game-changer for our business. Their commitment to quality and timely delivery has exceeded our expectations. The fabrics we source from them are top-notch and have significantly improved our product line. We couldn't ask for a better partner in the textile industry!", author: " Emily R., Fashion Designer" },
  { text: "I've been sourcing fabrics from Helm Textile Mills for years, and they have never let me down. The team is knowledgeable, responsive, and always willing to go the extra mile to ensure we get exactly what we need. Their attention to detail and focus on sustainability make them stand out in the market.", author:  "David M., Home Furnishings Manufacturer" },
  { text: "What sets Helm Textile Mills apart is their ability to innovate while maintaining high standards of quality. Their fabrics are not only durable but also beautifully designed, making them perfect for our needs. Their customer service is exceptional, and I can always rely on them to deliver on time.", author: " Sophia L., Automotive Upholstery Specialist" },
];

const Reviews = () => {
  return (
    <div className="relative h-screen bg-cover bg-center sm:bg-right md:bg-center lg:bg-cover" style={{ backgroundImage: "url('/assets/background2.jpg')" }}>
      <div className="flex items-center h-screen justify-center bg-gray-800 bg-opacity-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-white mb-24">What Our Customers Say About Us!</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-8 items-center">
            {reviews.map((review, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <div key={index} className="bg-[#00378b] shadow-lg p-6 rounded-lg w-full h-72 sm:w-96 md:w-1/2 lg:w-1/3 flex flex-col justify-between">
                <p className="italic text-gray-100">&apos;&apos;{review.text}&apos;&apos;</p>
                <p className="text-right font-semibold text-gray-100 mt-4"> {review.author}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
};

export default Reviews;
