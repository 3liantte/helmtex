import dynamic from "next/dynamic";
import React from "react";
import InfoSection from "../components/InfoSection/InfoSection";
import Reviews from "../components/CustomReviews/Reviews";
import Footer from "../components/Footer/Footer";
import WelcomePage from "../components/HomePage/Welcomepage";
import Specialties from "../components/Specialties/Specialties";

const ActiveSlider = dynamic(
  () => import("../components/ProductCarousel/ActiveSlider"),
  {
    loading: () => <div className="min-h-[420px] bg-gray-100" aria-hidden="true" />,
  }
);

export default function Home() {
  return (
    <>
      <div className="bg-white md:w-full md:h-screen">
        <WelcomePage />
        <InfoSection />
        <Specialties />
        <ActiveSlider />
        <Reviews />
        <Footer />
      </div>
    </>
  );
}
