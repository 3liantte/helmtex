import React from 'react';
import Image from 'next/image';
import backgroundImage from "@/public/assets/background4.jpg"

const WelcomePage = () => {
  return (
    <div className="relative h-screen bg-cover">
      <Image
        src={backgroundImage}
        alt="Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority={true}
        className='bg-center sm:bg-right md:bg-center lg-bg-cover'
      />
      <div className="absolute inset-0 bg-black opacity-65" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4 sm:px-8">
        <h1 className="text-md sm:text-lg md:text-2xl font-light uppercase tracking-wider animate-fade-in-up">Welcome to</h1>
        <h2 className="text-5xl sm:text-5xl md:text-7xl font-bold my-2 sm:my-4 animate-fade-in-up-delayed">Helm Textile Mills</h2>
        <h3 className="text-lg sm:text-xl md:text-3xl font-light tracking-wide animate-fade-in-up-delay-more">SA&apos;s Leading Textile Company</h3>
      </div>
    </div>
  )
};

export default WelcomePage;