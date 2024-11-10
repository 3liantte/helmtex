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
    '/assets/img3.jpg', // Path to image 3
    '/assets/img4.jpg', // Path to image 4
    '/assets/img5.jpg', // Path to image 5
    '/assets/img10.jpg', // Path to image 5
    '/assets/img9.jpg', // Path to image 5
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
    }, 3000); // 3000ms = 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [emblaApi]);

  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-8 md:p-16 bg-gray-100">
      {/* Text Content */}
      <div className="md:w-1/2 mb-8 md:mb-0">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
          Welcome to one of the leading textiles company all over nation.
        </h1>
        <p className="text-lg text-gray-600 italic mb-6">
          Write a paragraph that talks about your brand or property here. 
          Convince your prospective clients to choose you and your offerings by highlighting the qualities that set you apart from the competition. 
          Your audience is already on your website, so push a little bit harder to seal the deal!
        </p>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam accumsan, odio vel mattis consectetur, 
            libero sem viverra eros, vitae vestibulum tortor dui ut eros. Aenean porta volutpat nulla vitae commodo. 
            Sed viverra nulla viverra convallis egestas. Duis malesuada eget elit et iaculis. Nulla lacus nisl, dapibus vitae nisl ut, 
            consequat luctus ligula. Nullam imperdiet velit id mi tempor congue. Mauris at molestie lorem. Aliquam commodo feugiat fermentum. 
            Duis et ante pretium, dignissim dui posuere, facilisis tellus. Proin cursus finibus elementum. Sed in ante ullamcorper, euismod metus ut, 
            lobortis tortor. Mauris tempus magna vel pellentesque sollicitudin. Quisque tincidunt, augue vel elementum ornare, dolor eros commodo purus, 
            vel fermentum purus dui vitae lectus. Mauris eget malesuada quam.
        </p>
            <br />
        <p>
            Nam neque purus, elementum non enim at, pharetra volutpat leo. Orci varius natoque penatibus et magnis dis parturient montes, 
            ascetur ridiculus mus. Sed quis massa gravida, volutpat eros eget, tristique ligula. Nunc rhoncus condimentum lectus in aliquam. Mauris tincidunt 
            semper felis eu lobortis. Vestibulum dignissim nec lacus vitae fermentum. Curabitur congue interdum metus, non consectetur dolor egestas eleifend. 
            Sed facilisis ornare nibh quis posuere. Integer imperdiet, massa at venenatis ornare, massa augue faucibus nisi, vitae iaculis ipsum lectus vel tellus. 
            Praesent vulputate velit magna, ut scelerisque orci auctor eu. Maecenas at lectus ante.
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
                            width={600}
                            height={600}
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
