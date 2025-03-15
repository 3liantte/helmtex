"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Button } from "../../components/ui/button";
import { ChevronUp, ChevronLeft, ChevronRight } from "lucide-react";

const WelcomePage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState("next"); // Track slide direction
  const [isAnimating, setIsAnimating] = useState(false);

  // Images for the slider
  const images = [
    "/assets/background4.jpg",
    "/assets/background5.jpg",
    "/assets/background3.jpg",
    "/assets/background2.jpg",
    "/assets/background.png",
  ];

  // Manual navigation functions
  const goToNextSlide = useCallback(() => {
    if (isAnimating) return;

    setIsAnimating(true);
    setDirection("next");
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));

    // Reset animation lock after transition completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000); // Match this with the CSS transition duration
  }, [images.length, isAnimating]);

  const goToPrevSlide = useCallback(() => {
    if (isAnimating) return;

    setIsAnimating(true);
    setDirection("prev");
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));

    // Reset animation lock after transition completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000); // Match this with the CSS transition duration
  }, [images.length, isAnimating]);

  // Go to specific slide
  const goToSlide = useCallback(
    (index) => {
      if (isAnimating || index === currentSlide) return;

      setIsAnimating(true);
      // Determine direction based on index
      if (index > currentSlide) {
        setDirection("next");
      } else if (index < currentSlide) {
        setDirection("prev");
      } else {
        // Special case for wrapping around
        if (index === 0 && currentSlide === images.length - 1) {
          setDirection("next");
        } else if (index === images.length - 1 && currentSlide === 0) {
          setDirection("prev");
        }
      }

      setCurrentSlide(index);

      setTimeout(() => {
        setIsAnimating(false);
      }, 1000);
    },
    [currentSlide, isAnimating, images.length]
  );

  // Toggle visibility of the scroll-to-top button based on scroll position
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Auto slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        goToNextSlide();
      }
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [goToNextSlide, isAnimating]);

  // Enhanced smooth scroll-to-top functionality
  const scrollToTop = () => {
    // Get the current scroll position
    const currentPosition = window.pageYOffset;

    // If browser supports smooth scrolling, use it
    if ("scrollBehavior" in document.documentElement.style) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      // Fallback for browsers that don't support smooth scrolling
      // Implement custom smooth scrolling with JavaScript
      const duration = 500; // ms
      const startTime = performance.now();

      const animateScroll = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);

        // Easing function for a smoother feel (ease-out)
        const easeProgress = 1 - Math.pow(1 - progress, 3);

        window.scrollTo(0, currentPosition * (1 - easeProgress));

        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        }
      };

      requestAnimationFrame(animateScroll);
    }
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image Slider */}
      <div className="absolute inset-0 w-full h-full">
        {images.map((image, index) => {
          // Determine the position of each slide
          let position = "";

          if (index === currentSlide) {
            position = "translate-x-0"; // Current slide in view
          } else if (direction === "next") {
            // For "next" direction transitions
            position =
              index === (currentSlide + images.length - 1) % images.length
                ? "-translate-x-full" // Previous slide moves off to the left
                : "translate-x-full"; // All other slides wait off-screen to the right
          } else {
            // For "prev" direction transitions
            position =
              index === (currentSlide + 1) % images.length
                ? "translate-x-full" // Next slide moves off to the right
                : "-translate-x-full"; // All other slides wait off-screen to the left
          }

          return (
            <div
              key={index}
              className={`absolute inset-0 transition-transform duration-1000 ease-in-out ${position}`}
              style={{ willChange: "transform" }}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`Slide ${index + 1}`}
                fill
                priority={index === currentSlide}
                className="object-cover"
              />
            </div>
          );
        })}
        {/* Overlay to darken images */}
        <div className="absolute inset-0 bg-black opacity-65" />
      </div>

      {/* Fixed Content - This stays on screen at all times */}
      <div className="relative z-30 flex flex-col items-center justify-center h-full text-center text-white px-4 sm:px-8">
        <h1 className="text-md sm:text-lg md:text-2xl font-light uppercase tracking-wider animate-fade-in-up">
          Welcome to
        </h1>
        <h2 className="text-5xl sm:text-5xl md:text-7xl font-bold my-2 sm:my-4 animate-fade-in-up-delayed">
          Helm Textile Mills
        </h2>
        <h3 className="text-lg sm:text-xl md:text-3xl font-light tracking-wide animate-fade-in-up-delay-more">
          SA&apos;s Leading Textile Company
        </h3>
      </div>

      {/* Slider Navigation - Below the fixed content */}
      <div className="absolute bottom-10 left-0 right-0 z-30 flex justify-center gap-2">
        {images.map((_, index) => (
          <Button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === index ? "bg-white scale-125" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            disabled={isAnimating}
          />
        ))}
      </div>

      {/* Slider Arrows */}
      <Button
        onClick={goToPrevSlide}
        className={`absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 text-white px-2 rounded-full transition-all ${
          isAnimating ? "opacity-50 cursor-not-allowed" : ""
        }`}
        aria-label="Previous slide"
        disabled={isAnimating}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        onClick={goToNextSlide}
        className={`absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all ${
          isAnimating ? "opacity-50 cursor-not-allowed" : ""
        }`}
        aria-label="Next slide"
        disabled={isAnimating}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Scroll-to-Top Button with Tailwind Animations */}
      <div
        className={`fixed bottom-8 right-8 z-50 transition-all duration-500 ease-in-out transform ${
          isVisible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-10 scale-75 pointer-events-none"
        }`}
      >
        <Button
          onClick={scrollToTop}
          className="h-10 w-10 rounded-full bg-blue-500 shadow-lg hover:bg-blue-600 transition-all duration-300 hover:shadow-xl group"
          aria-label="Scroll to top"
        >
          <ChevronUp className="animate-bounce-subtle transform transition-transform duration-300 group-hover:-translate-y-1" />
        </Button>
      </div>
    </div>
  );
};

export default WelcomePage;
