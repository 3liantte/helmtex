"use client"
import { useState, useEffect } from "react";
import Image from 'next/image';
import { Button } from "../ui/button";

function ProductCarousel() {
  const ranges = [
    {
      title: "Customised Fabrics",
      description: "This feature allows you to get your private taste in your home.",
      imageUrl: "/assets/customise.jpg",
    },
    {
      title: "Diamond Range",
      description: "Offers the timeless classic fabrics never to be lost.",
      imageUrl: "/assets/diamond.jpg",
    },
    {
      title: "Domestic Range",
      description: "Decor for home indoor and outdoor",
      imageUrl: "/assets/domestic.jpg",
    },
    {
        title: "Studio Explore",
        description: "Description here",
        imageUrl: "/assets/explore.jpg",
      },
      {
        title: "The Great Outdoor",
        description: "Solution dyed fabrics, which achieve international norms, or hybrid fabrics are also offered and can be custom made to your needs",
        imageUrl: "/assets/outdoor.jpg",
      },
      {
        title: "The Great Plains",
        description: "Description here",
        imageUrl: "/assets/plains.jpg",
      },
      {
        title: "Scape Range",
        description: "Description here",
        imageUrl: "/assets/scape.jpg",
      },
      {
        title: "Slub Plain",
        description: "Description here",
        imageUrl: "/assets/slub.jpg",
      },
      {
        title: "Studio Range",
        description: "Description here",
        imageUrl: "/assets/studio.jpg",
      },
      {
        title: "Tailor Range",
        description: "Description here",
        imageUrl: "/assets/tailor.jpg",
      },
      {
        title: "Valley Range",
        description: "Description here",
        imageUrl: "/assets/valley.jpg",
      },
      {
        title: "Westcliff Range",
        description: "Description here",
        imageUrl: "/assets/westcliff.jpg",
      },
      {
        title: "@Work Range",
        description: "Description here",
        imageUrl: "/assets/workrange.jpg",
      },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 6000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? ranges.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === ranges.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const previousIndex = (currentIndex - 1 + ranges.length) % ranges.length;
  const nextIndex = (currentIndex + 1) % ranges.length;

  return (
    <div className="carousel-container relative w-full max-w-6xl mx-auto p-4">
      <h2 className="text-center text-2xl font-semibold mb-4">Our Products</h2>

      <div className="carousel flex items-center justify-between transition-transform duration-500 ease-in-out">
        {/* Previous Slide Preview */}
        <div className="hidden sm:block w-1/4 lg:w-1/6 opacity-50">
          <Image
            src={ranges[previousIndex].imageUrl}
            alt={ranges[previousIndex].title}
            className="w-full h-48 object-cover rounded-lg"
            width={200}
            height={200}
            priority={true}
            quality={100}
          />
          <div className="p-2">
            <p className="text-sm text-gray-400">{ranges[previousIndex].title}</p>
          </div>
        </div>

        {/* Current Slide */}
        <div className="w-full sm:w-3/4 lg:w-4/6 bg-white shadow-lg rounded-lg p-4">
          <Image
            src={ranges[currentIndex].imageUrl}
            alt={ranges[currentIndex].title}
            className="w-full h-64 sm:h-80 object-cover rounded-t-lg"
            width={800}
            height={400}
            priority={true}
            quality={100}
          />
          <div className="p-4">
            <p className="text-sm text-gray-500">{ranges[currentIndex].capacity}</p>
            <h3 className="text-lg font-bold">{ranges[currentIndex].title}</h3>
            <p className="text-gray-700">{ranges[currentIndex].description}</p>
          </div>
        </div>

        {/* Next Slide Preview */}
        <div className="hidden sm:block w-1/4 lg:w-1/6 opacity-50">
          <Image
            src={ranges[nextIndex].imageUrl}
            alt={ranges[nextIndex].title}
            className="w-full h-48 object-cover rounded-lg"
            width={200}
            height={200}
            priority={true}
            quality={100}
          />
          <div className="p-2">
            <p className="text-sm text-gray-400">{ranges[nextIndex].title}</p>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <Button
        onClick={goToPrevious}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
      >
        &#8249;
      </Button>
      <Button
        onClick={goToNext}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
      >
        &#8250;
      </Button>
    </div>
  );
}

export default ProductCarousel;
