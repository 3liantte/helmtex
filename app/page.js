import React from "react";
import InfoSection from "@/components/InfoSection/InfoSection";
import Reviews from "@/components/CustomReviews/Reviews";
import Footer from "@/components/Footer/Footer";
import WelcomePage from "@/components/HomePage/Welcomepage";
import Specialties from "@/components/Specialties/Specialties";
import ActiveSlider from "@/components/ProductCarousel/ActiveSlider";

export default function Home() {
  return (
      <>
       <div className="bg-white md:w-full md:h-screen">
        <WelcomePage/>
        <InfoSection/>
        <Specialties/>
        <ActiveSlider/>
        <Reviews/>
        <Footer/>
       </div>
      </>
  );
}
