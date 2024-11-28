"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { FreeMode, Pagination } from "swiper/modules";
import { ServiceData } from "../constants";
import Image from "next/image";

const ActiveSlider = () => {
  const router = useRouter();

  const handleNavigation = () => {
    router.push("/products");
  };

  return (
    <div
      className="flex items-center justify-start flex-col min-h-fit bg-gray-100 pt-24 pb-24" role="region"
      aria-label="Service Slider"
    >
      <h1 className="mb-10 text-gray-700 font-semibold text-3xl">Our Products</h1>
      <Swiper
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 10 },
          640: { slidesPerView: 2, spaceBetween: 15 },
          1024: { slidesPerView: 3, spaceBetween: 20 },
          1440: { slidesPerView: 4, spaceBetween: 25 },
        }}
        freeMode={true}
        pagination={{ clickable: true }}
        modules={[FreeMode, Pagination]}
        a11y={{ enabled: true }}
        className="w-full max-w-[90%] lg:max-w-[80%]"
      >
        {ServiceData.map((item) => (
          <SwiperSlide
            key={item.title}
            aria-label={`Slide ${item.title}`}
            onClick={handleNavigation}
          >
            <div className="flex flex-col gap-6 sm:gap-6 mb-8 group relative shadow-lg text-white rounded-lg px-4 sm:px-6 py-6 sm:py-8 h-[220px] w-[180px] sm:h-[250px] sm:w-[200px] lg:h-[350px] lg:w-[300px] xl:h-[400px] xl:w-[350px] overflow-hidden cursor-pointer">
              {/* Background Image */}
              <Image
                src={item.backgroundImage}
                alt={`Service: ${item.title}`}
                layout="fill"
                objectFit="cover"
                className="absolute inset-0"
              />
              <div className="absolute inset-0 bg-black opacity-10 group-hover:opacity-50 transition-opacity duration-300" />
              <div className="relative flex flex-col gap-2 sm:gap-3 z-10">
                <h1 className="text-base sm:text-lg lg:text-xl font-bold">
                  {item.title}
                </h1>
                <p className="mt-2 text-sm sm:text-base lg:text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.content}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ActiveSlider;
