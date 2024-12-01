import React from 'react';
import Image from 'next/image';
import img1 from "@/public/assets/display2.jpg";
import img2 from "@/public/assets/display4.jpg";
import img3 from "@/public/assets/display3.jpg";
import img4 from "@/public/assets/display4.jpg";
import img5 from "@/public/assets/display3.jpg";
import img6 from "@/public/assets/display4.jpg";

const ArticleCard = ({ title, description, image }) => (
  <div className="w-full rounded-t-xl bg-white overflow-hidden cursor-pointer">
    <Image
      src={image}
      alt={title}
      quality={100}
      priority={true}
      width={400}
      height={400}
      className="w-full object-cover transition-all duration-300 hover:scale-105"
    />
    <div className="w-full p-6 flex flex-col border hover:border-[#00378b]">
      <h5 className="text-md font-semibold text-gray-900 mb-4 truncate">
        {title}
      </h5>
      <p className="text-sm font-medium text-gray-600 line-clamp-2">
        {description}
      </p>
    </div>
  </div>
);

const Blog = () => {
  const articles = [
    { title: 'Fabric Manufacturer: Crafting Quality with Innovation', description: " Crafting Quality with Innovation As one of the cornerstones of industry and everyday life, fabric manufacturing in South Africa.", image: img1 },
    { title: 'Upholstery Fabrics - 7 Types: Enhance with Luxury', description: " Upholstery fabrics play a pivotal role in creating the perfect blend of aesthetics, durability, and functionality for home decor, hospitality spaces, or commercial environments.", image: img2 },
    { title: 'Textile Manufacturing Excellence: 5 Key Essential Steps', description:" Helm Textile Mills is a leading textile manufacturing company at the forefront of producing high-quality fabrics...", image: img3 },
    { title: 'Weaving Custom Services: 5 Steps to Unleashing Excellent Tailoring', description: "creativity knows no bounds. Whether you're an interior designer, a fashion brand, or a bespoke upholstery studio...", image: img4 },
    { title: 'Heimtextil Trends 20/21 Overview by Stijlinstituut Amsterdam', description: "Reflecting on this year's Heimtextil trend “WHERE I BELONG” shows one size does not fit all...", image: img5 },
    { title: 'The Sustainability Revolution', description: "Meeting the needs of the present without compromising the ability of future generations to meet theirs.", image: img6 },
  ];

  return (
    <>
      <div className="flex items-center justify-center mb-2">
        <h5 className="text-gray-600 tracking-[.15em]">WELCOME TO OUR BLOG!</h5>
      </div>
      <p className="text-center text-gray-600 italic text-base md:text-lg leading-relaxed px-4 sm:px-8 lg:px-16 mb-2">
        Here we share insights, trends, and stories from our journey as a leader in the textile industry. <br />
        Whether you&apos;re looking for inspiration, tips, or updates on our latest innovations, we&apos;re excited to have you join us. <br />
        Let&apos;s explore the world of quality, craftsmanship, and creativity together!
      </p>

      <div className="inline-flex items-center justify-center w-full mb-8">
        <hr className="w-2/5 h-0 my-0 bg-gray-200 rounded" />
      </div>
      <div className="w-full relative flex items-center justify-center h-auto mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 lg:px-16">
          {articles.map((article, index) => (
            <ArticleCard
              key={index}
              title={article.title}
              description={article.description}
              image={article.image}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Blog;
