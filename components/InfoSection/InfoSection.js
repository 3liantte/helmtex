"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"; 
import { Card, CardContent } from "@/components/ui/card";
import useEmblaCarousel from 'embla-carousel-react'; 

const InfoSection = () => {
  const images = [
    '/assets/img3.jpg',
    '/assets/img4.jpg', 
    '/assets/img5.jpg',
    '/assets/img10.jpg',
    '/assets/img9.jpg', 
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true, // Enables infinite scroll
    speed: 10,   // Adjust scroll speed if necessary
  });

  // Auto-scroll the carousel every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (emblaApi) {
        emblaApi.scrollNext(); // Use Embla API to scroll to the next item
      }
    }, 10000); // 1000ms = 1 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [emblaApi]);

  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-8 md:p-16 bg-gray-100">
      {/* Text Content */}
      <div className="md:w-1/2 mb-8 md:mb-0">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
          Welcome to Helm Textile Mills, where craftsmanship meets innovation.
        </h1>
        <p className="text-lg text-gray-600 italic mb-6">
          Since 1992, we have been dedicated to producing high-quality textiles that cater to diverse industries and unique client needs. 
          With nearly three decades of expertise, our commitment to excellence, sustainability, and customer satisfaction has made us a trusted name 
          in the textile manufacturing world. At Helm, we blend state-of-the-art technology with a passion for creating fabrics that inspire and endure. 
          Whether you&apos;re seeking custom designs, bulk production, or tailored solutions, we are here to turn your vision into reality. 
        
        </p>
        <p>
          At Helm Textile Mills, we take pride in being more than just a textile manufacturer. Our legacy is built on fostering strong 
          relationships with our clients by understanding their unique needs and delivering tailored solutions that exceed expectations. 
          From fashion and home décor to automotive and industrial fabrics, our diverse portfolio reflects our versatility and unwavering commitment 
          to quality. With cutting-edge equipment and a team of skilled professionals, we ensure every thread is crafted to perfection, combining durability, 
          style, and functionality in every product we deliver.        
        </p>
            <br />
        <p>
          Sustainability is at the heart of everything we do. We are dedicated to minimizing our environmental 
          impact by adopting eco-friendly practices and responsibly sourcing materials. At Helm Textile Mills, we don&pos;t just create textiles; we create opportunities 
          for a better future for our clients, employees, and the planet. As we continue to grow, we remain steadfast in our mission to innovate, 
          inspire, and deliver textiles that stand the test of time. Together, let&apos;s weave a legacy of quality and trust.        
        </p>
      </div>

      {/* Carousel Image Section */}
      <div className="md:w-1/2 w-full relative">
        <Carousel className="w-full" ref={emblaRef}  options={{ draggable: false }}>
          <CarouselContent>
            {images.map((img, index) => (
              <CarouselItem key={index}>
                <div className="p-2">
                  <Card>
                    <CardContent className="relative w-full h-96">
                      <Image
                        src={img}
                        alt={`Image ${index + 1}`}
                        layout="fill"
                        className="w-full h-full object-cover rounded-lg"
                        priority={true}
                        quality={100}
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
