"use client";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import subset from "../../lib/subset";
import { ArrowLeft, ChevronUp, Search, X } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
} from "../../components/ui/dialog";
import { toast } from "sonner";
import { Input } from "../../components/ui/input";

const Collection = () => {
  const [productDetails, setProductDetails] = useState({
    id: null,
    title: null,
    imageUrl: null,
  });
  const [matchedSubset, setMatchedSubset] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFabric, setSelectedFabric] = useState(null);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [quoteName, setQuoteName] = useState("");
  const [quoteEmail, setQuoteEmail] = useState("");
  const [quoteQty, setQuoteQty] = useState("");
  const [quoteNote, setQuoteNote] = useState("");
  const searchParams = useSearchParams();
  const imageUrl = searchParams.get("imageUrl");
  const title = searchParams.get("title");
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    const title = searchParams.get("title");
    const imageUrl = searchParams.get("imageUrl");
    const pathSegments = window.location.pathname.split("/").filter(Boolean);
    const id = pathSegments[pathSegments.length - 1];
    
    try {
      if (title && id && imageUrl) {
        setProductDetails({ id, title, imageUrl });
        const foundSubset = subset.find((range) => {
          const category = Object.keys(range)[0];
          return category === title;
        });
        setMatchedSubset(foundSubset);
      }
    } catch (error) {
      console.error(error);
    }
  }, [searchParams]);

  const handleClickBack = () => {
    router.push("/products");
  };

  const openImageDialog = (imageSrc, imageAlt) => {
    setSelectedImage({ src: imageSrc, alt: imageAlt });
    setIsDialogOpen(true);
  };

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
        const easeProgress = 1 - (1 - progress) ** 3;

        window.scrollTo(0, currentPosition * (1 - easeProgress));

        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        }
      };

      requestAnimationFrame(animateScroll);
    }
  };

  
  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-12 xl:pt-24 xl:px-16 xl:pb-16 w-full pt-24">
      <div className="relative mb-4 sm:mb-6 md:mb-8">
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
        <div
          className="relative w-full h-32 sm:h-40 md:h-48 lg:h-56 xl:h-72 cursor-pointer"
          onClick={() =>
            openImageDialog(
              imageUrl || "/api/placeholder/800/400",
              title || "Collection image"
            )
          }
        >
          <Image
            src={imageUrl || "/api/placeholder/800/400"}
            alt={title || "Collection image"}
            className="object-cover w-full h-full rounded-lg"
            fill
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
          />
        </div>
        <div className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4">
          <Button
            variant="outline"
            className="bg-white/80 hover:bg-blue-500 text-black hover:text-white rounded-xl h-8 w-8 p-0 sm:h-10 sm:w-10"
            onClick={handleClickBack}
          >
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>
        <h2 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center w-full px-4">
          {title}
        </h2>
      </div>

      {/* Centered Div with warning message*/}
      <details className="border border-red-600 border-dashed rounded-2xl p-4 mb-8">
        <summary className="font-bold cursor-pointer">Disclaimer</summary>
        <p className="mt-2 text-sm">
          Digital fabric images may vary in color and texture from the actual material. 
          Please request a sample for accurate evaluation.
        </p>
      </details>

      <div className="mb-6 flex justify-center">
        <div className="relative w-full max-w-xl">
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search fabric by name or code..."
            className="w-full border rounded-md px-4 py-2 text-base shadow-sm focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>      
      {matchedSubset ? (
        <div className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 w-full">
            {(() => {
              const entries = Object.entries(
                (matchedSubset && Object.values(matchedSubset)[0]) || {}
              );
              const filtered = entries.filter(([_, value]) =>
                value?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                value?.content?.toLowerCase().includes(searchTerm.toLowerCase())
              );

              if (filtered.length === 0) {
                return (
                  <div className="col-span-full text-center py-10 text-gray-500">
                    No fabric found matching your search.
                  </div>
                );
              }

              return filtered.map(([key, value]) => (
                <div key={key} className="p-3 sm:p-4 border rounded-xl w-full">
                  {value.image && (
                    <div
                      className="relative w-full h-48 sm:h-56 md:h-64 cursor-pointer"
                      onClick={() =>
                        openImageDialog(
                          value.image,
                          value.title || "Product image"
                        )
                      }
                    >
                      <Image
                        src={value.image}
                        alt={value.title || "Product image"}
                        className="rounded-lg object-cover"
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                      <p className="absolute bottom-0 right-0 z-10 mb-2 mr-2 text-blue-500 bg-white/70 px-2 py-1 rounded text-sm">
                        {value.code}
                      </p>
                    </div>
                  )}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-3 sm:pt-4 gap-2">
                    <p className="text-base sm:text-lg font-semibold line-clamp-2">Design</p>
                    <h3 className="text-base sm:text-lg text-blue-500 whitespace-nowrap">
                      {value.content}
                    </h3>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-3 sm:pt-4 gap-2">
                    <p className="text-base sm:text-lg font-semibold line-clamp-2">Design Code</p>
                    <h3 className="text-base sm:text-lg text-blue-500 whitespace-nowrap">
                      {value.title}
                    </h3>
                  </div>

                  {/* <div className="mt-4 flex justify-end">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedFabric({ ...value });
                        setIsQuoteOpen(true);
                      }}
                      className="mt-4 text-sm"
                    >
                      Request Quote
                    </Button>
                  </div> */}
                </div>
              ));
            })()}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-32">
          <p className="text-gray-500">Product Coming Soon.</p>
        </div>
      )}

      {/* Image Zoom Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-5xl w-full p-0 overflow-hidden bg-black/90">
          <DialogTitle className="sr-only">
            {selectedImage?.alt || "Image Preview"}
          </DialogTitle>
          <div className="absolute top-2 right-2 z-10">
            <DialogClose asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0 text-white hover:bg-white/20 rounded-full"
              >
                <X className="h-5 w-5" />
              </Button>
            </DialogClose>
          </div>
          <div className="relative w-full h-[80vh] flex items-center justify-center">
            {selectedImage && (
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="object-contain"
                fill
                sizes="100vw"
                priority
              />
            )}
          </div>
        </DialogContent>
      </Dialog>


    {/* Get fabric quote modal */}
      <Dialog open={isQuoteOpen} onOpenChange={setIsQuoteOpen}>
          <DialogContent className="w-full max-w-md sm:max-w-md px-4 sm:px-6 py-6 rounded-xl">
            <DialogTitle>Request a Quote</DialogTitle>
              <div className="space-y-4">
                <p><strong>Design:</strong> {selectedFabric?.content}</p>
                <p><strong>Design Code:</strong> {selectedFabric?.title}</p>

                <input
                  type="text"
                  placeholder="Your Name"
                  value={quoteName}
                  onChange={(e) => setQuoteName(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 text-sm"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  value={quoteEmail}
                  onChange={(e) => setQuoteEmail(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 text-sm"
                />

                <input
                  type="number"
                  placeholder="Quantity (meters)"
                  value={quoteQty}
                  onChange={(e) => setQuoteQty(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 text-sm"
                />

                <textarea
                  placeholder="Additional notes"
                  value={quoteNote}
                  onChange={(e) => setQuoteNote(e.target.value)}
                  rows={3}
                  className="w-full border rounded-md px-3 py-2 text-sm"
                />

                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => {
                    if (!quoteName || !quoteEmail || !quoteQty) {
                      toast.error("Please fill in all required fields.");
                      return;
                    }

                    toast.success("Quote request sent successfully!");

                    // Reset + Close
                    setIsQuoteOpen(false);
                    setQuoteName("");
                    setQuoteEmail("");
                    setQuoteQty("");
                    setQuoteNote("");
                    }}
                  >
                  Submit Request
                </Button>
              </div>
          </DialogContent>
        </Dialog>

      {/* Scroll-to-Top Button with Tailwind Animations */}
      <div
        className="fixed bottom-8 right-8 z-50 transition-all duration-500 ease-in-out transform"
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

const CollectionPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          Loading...
        </div>
      }
    >
      <Collection />
    </Suspense>
  );
};

export default CollectionPage;