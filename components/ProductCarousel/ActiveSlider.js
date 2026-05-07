"use client";

import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { FreeMode, Pagination } from "swiper/modules";
import { ServiceData } from "../constants";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Optional: use any icon you prefer
import { Button } from "../ui/button";

const ActiveSlider = () => {
  const router = useRouter();
  const swiperRef = useRef(null);

  const handleNavigation = () => {
    router.push("/products");
  };

  return (
    <div
      className="flex flex-col items-center w-full min-h-fit bg-gray-100 py-12 sm:py-16 md:py-20 lg:py-24"
      role="region"
      aria-label="Service Slider"
    >
      <h1 className="mb-6 sm:mb-8 md:mb-10 text-gray-700 font-semibold text-2xl sm:text-3xl md:text-4xl text-center px-4">
        Our Products
      </h1>

      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        breakpoints={{
          320: { slidesPerView: 1.2, spaceBetween: 10 },
          480: { slidesPerView: 1.5, spaceBetween: 15 },
          640: { slidesPerView: 2, spaceBetween: 15 },
          768: { slidesPerView: 2.5, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 20 },
          1280: { slidesPerView: 3.5, spaceBetween: 25 },
          1440: { slidesPerView: 4, spaceBetween: 25 },
        }}
        freeMode={true}
        pagination={{ clickable: true }}
        modules={[FreeMode, Pagination]}
        a11y={{ enabled: true }}
        className="w-full max-w-[95%] sm:max-w-[90%] lg:max-w-[85%]"
      >
        {ServiceData.map((item) => (
          <SwiperSlide
            key={item.title}
            aria-label={`Slide ${item.title}`}
            onClick={handleNavigation}
            className="py-4 px-2"
          >
            <div className="flex flex-col gap-4 sm:gap-6 group relative shadow-lg text-white rounded-lg px-4 py-6 h-[180px] xs:h-[200px] sm:h-[220px] md:h-[280px] lg:h-[320px] xl:h-[360px] w-full overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl">
              <div className="absolute inset-0">
                <Image
                  src={item.backgroundImage}
                  alt={`Service: ${item.title}`}
                  fill
                  sizes="(max-width: 640px) 90vw, (max-width: 768px) 45vw, (max-width: 1024px) 30vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-60 transition-opacity duration-300" />
              <div className="relative flex flex-col h-full justify-between z-10">
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold drop-shadow-md">
                  {item.title}
                </h1>
                <p className="mt-2 text-sm sm:text-base md:text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-4">
                  {item.content}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons */}
      <div className="flex gap-4 mt-6">
        <Button
          onClick={() => swiperRef.current?.slidePrev()}
          className="p-2 bg-white shadow rounded-full hover:bg-gray-200 transition"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </Button>
        <Button
          onClick={() => swiperRef.current?.slideNext()}
          className="p-2 bg-white shadow rounded-full hover:bg-gray-200 transition"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </Button>
      </div>
    </div>
  );
};

export default ActiveSlider;
