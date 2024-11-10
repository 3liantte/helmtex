// src/ReviewSection.js
import React from 'react';

const reviews = [
  { text: "Boost your product and service's credibility by adding testimonials from your clients. People love recommendations so feedback from others who've tried it is invaluable.", author: "Santa Solana Post" },
  { text: "Boost your product and service's credibility by adding testimonials from your clients. People love recommendations so feedback from others who've tried it is invaluable.", author: "Mariana's Luxe Travels" },
  { text: "Boost your product and service's credibility by adding testimonials from your clients. People love recommendations so feedback from others who've tried it is invaluable.", author: "Fairhill Journal" },
];

const Reviews = () => {
  return (
    <div className="relative h-screen bg-cover bg-center sm:bg-right md:bg-center lg:bg-cover" style={{ backgroundImage: "url('/assets/background4.jpg')" }}>
      <div className="flex items-center h-screen justify-center bg-gray-800 bg-opacity-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-white mb-24">What Our Customers Say About Us!</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-8 items-center">
            {reviews.map((review, index) => (
              <div key={index} className="bg-white shadow-lg p-6 rounded-lg w-full sm:w-80 md:w-1/3 lg:w-1/4">
                <p className="italic text-gray-700">{review.text}</p>
                <p className="text-right font-semibold text-gray-800 mt-4"> {review.author}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
};

export default Reviews;
