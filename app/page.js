import React from "react";
import InfoSection from "@/components/InfoSection/InfoSection";
import ProductCarousel from "@/components/ProductCarousel/ProductCarousel";
import Reviews from "@/components/CustomReviews/Reviews";
import Footer from "@/components/Footer/Footer";
import WelcomePage from "@/components/HomePage/Welcomepage";
import Specialities from "@/components/Specialties/Specialties";

export default function Home() {
  return (
      <>
       <div className="bg-white w-full h-screen">
        <WelcomePage/>
        <InfoSection/>
        <Specialities/>
        <ProductCarousel/>
        <Reviews/>
        <Footer/>
       </div>
      </>
  );
}
