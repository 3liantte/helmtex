"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"; // Assuming this is your carousel setup
import { Card, CardContent } from "@/components/ui/card";
import useEmblaCarousel from 'embla-carousel-react'; // Ensure you have this hook

const InfoSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalItems = 5; // Number of carousel items
  const images = [
    '/assets/img2.jpg', // Path to image 2
    '/assets/img3.jpg', // Path to image 3
    '/assets/img4.jpg', // Path to image 4
    '/assets/img5.jpg', // Path to image 5
  ];

  // Initialize Embla Carousel hook with options
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true, // Enables infinite scroll
    speed: 5,   // Adjust scroll speed if necessary
  });

  // Auto-scroll the carousel every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (emblaApi) {
        emblaApi.scrollNext(); // Use Embla API to scroll to the next item
      }
    }, 2000); // 2000ms = 2 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [emblaApi]);

  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-8 md:p-16 bg-gray-100">
      {/* Text Content */}
      <div className="md:w-1/2 mb-8 md:mb-0">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
          Welcome to your luxurious home away from home
        </h1>
        <p className="text-lg text-gray-600 italic mb-6">
          Write a paragraph that talks about your brand or property here. Convince your prospective clients to choose you and your offerings by highlighting the qualities that set you apart from the competition. Your audience is already on your website, so push a little bit harder to seal the deal!
        </p>
      </div>

      {/* Carousel Image Section */}
      <div className="md:w-1/2 w-full relative">
        <Carousel className="w-full" ref={emblaRef}>
          <CarouselContent>
            {images.map((img, index) => (
              <CarouselItem key={index}>
                <div className="p-2">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                            <Image 
                            src={img} 
                            alt={`Image ${index + 1}`} 
                            width={400}
                            height={400}
                            className="w-full h-auto object-contain rounded-lg" 
                            priority // For faster loading of carousel images
                        />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default InfoSection;
