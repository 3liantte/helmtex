import React from "react";
import Nav from "@/components/Navbar/Nav";
import HomePage from "@/components/HomePage/Homepage";
import InfoSection from "@/components/InfoSection/InfoSection";

export default function Home() {
  return (
      <>
       <Nav/>
       <div className="bg-blue-200 w-full h-screen">
        <HomePage/>
        <InfoSection/>
       </div>
      </>
  );
}
