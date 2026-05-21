/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Loader2,
  RefreshCw,
  FolderOpen,
  ImageOff,
} from "lucide-react";
import { storage } from "../../lib/firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { Skeleton } from "../../components/ui/skeleton";
import { useRouter } from "next/navigation";
// Enhanced Empty State Component
const EmptyGalleryState = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center mt-52 px-4 text-center">
      {/* Icon Container with Animation */}
      <div className="relative mb-6">
        <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-4 animate-pulse">
          <svg
            className="w-10 h-10 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>

        {/* Decorative dots */}
        <div
          className="absolute -top-2 -right-2 w-4 h-4 bg-blue-200 rounded-full animate-bounce"
          style={{ animationDelay: "0.1s" }}
        ></div>
        <div
          className="absolute -bottom-1 -left-2 w-3 h-3 bg-purple-200 rounded-full animate-bounce"
          style={{ animationDelay: "0.3s" }}
        ></div>
        <div
          className="absolute top-1 -left-3 w-2 h-2 bg-pink-200 rounded-full animate-bounce"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>

      {/* Main heading */}
      <h3 className="text-2xl font-semibold text-gray-900 mb-3">
        No Photos Yet
      </h3>

      {/* Description */}
      <p className="text-gray-600 max-w-md mb-6 leading-relaxed">
        The gallery is currently empty, but don&apos;t worry - amazing photos
        are on their way!
        <span className="block mt-2 text-sm text-gray-500">
          Check back soon or refresh the page to see if new content has been
          added.
        </span>
      </p>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={() => window.location.reload()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg transition-colors duration-200"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh Page
        </Button>

        <Button
          variant="outline"
          className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2.5 rounded-lg transition-colors duration-200"
          onClick={() => {
            router.push("/products");
          }}
        >
          <FolderOpen className="w-4 h-4 mr-2" />
          Browse Other Sections
        </Button>
      </div>
    </div>
  );
};

const PhotoGalleryInfiniteScroll = () => {
  const [allImages, setAllImages] = useState([]);
  const [visibleCount, setVisibleCount] = useState(20);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [imageLoadingStates, setImageLoadingStates] = useState({});

  const imagesPerLoad = 20;
  const hasMoreImages = visibleCount < allImages.length;
  const loaderRef = useRef(null);

  // Get current visible images
  const visibleImages = allImages.slice(0, visibleCount);

  // Fetch images from Firebase Storage
  const fetchImages = async () => {
    try {
      const storageRef = ref(storage, "products/");
      const res = await listAll(storageRef);

      const imageUrls = await Promise.all(
        res.items.map(async (item, index) => {
          const url = await getDownloadURL(item);
          return {
            id: index + 1,
            src: url,
            alt: item.name || `Photo ${index + 1}`,
            // Create varying sizes for bento grid effect
            size:
              index % 9 === 0 ? "large" : index % 5 === 0 ? "medium" : "small",
          };
        })
      );

      return imageUrls;
    } catch (error) {
      console.error("Error fetching images from storage:", error);
      return [];
    }
  };

  // Load initial images
  useEffect(() => {
    const loadInitialImages = async () => {
      try {
        const fetchedImages = await fetchImages();
        if (fetchedImages.length > 0) {
          setAllImages(fetchedImages);

          // Initialize loading states for all images
          const initialLoadingStates = {};
          fetchedImages.forEach((img) => {
            initialLoadingStates[img.id] = true;
          });
          setImageLoadingStates(initialLoadingStates);
        } else {
          console.warn("No images found in Firebase Storage");
        }
      } catch (error) {
        console.error("Error loading initial images:", error);
      } finally {
        setInitialLoading(false);
      }
    };

    loadInitialImages();
  }, []);

  const loadMoreImages = useCallback(() => {
    if (loading || !hasMoreImages) return;

    setLoading(true);
    // Add delay to prevent rapid loading
    setTimeout(() => {
      setVisibleCount((prev) =>
        Math.min(prev + imagesPerLoad, allImages.length)
      );
      setLoading(false);
    }, 800);
  }, [loading, hasMoreImages, allImages.length, imagesPerLoad]);

  const handleImageClick = (image, index) => {
    setSelectedImage(image.src);
    setSelectedIndex(index);
    setOpen(true);
  };

  const handlePrevImage = () => {
    const prevIndex =
      selectedIndex > 0 ? selectedIndex - 1 : allImages.length - 1;
    setSelectedIndex(prevIndex);
    setSelectedImage(allImages[prevIndex].src);
  };

  const handleNextImage = () => {
    const nextIndex =
      selectedIndex < allImages.length - 1 ? selectedIndex + 1 : 0;
    setSelectedIndex(nextIndex);
    setSelectedImage(allImages[nextIndex].src);
  };

  const handleImageLoaded = (imageId) => {
    setImageLoadingStates((prev) => ({
      ...prev,
      [imageId]: false,
    }));
  };

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (initialLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreImages();
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loadMoreImages, initialLoading]);

  // Generate skeleton placeholders for initial loading
  const renderSkeletons = () => {
    const skeletons = [];
    for (let i = 0; i < imagesPerLoad; i++) {
      const size = i % 9 === 0 ? "large" : i % 5 === 0 ? "medium" : "small";
      skeletons.push(
        <div
          key={`skeleton-${i}`}
          className={`
            overflow-hidden rounded-lg
            ${
              size === "large"
                ? "col-span-2 row-span-2"
                : size === "medium"
                ? "col-span-2"
                : ""
            }
          `}
        >
          <div className="relative w-full h-full aspect-[4/3]">
            <Skeleton className="w-full h-full absolute" />
          </div>
        </div>
      );
    }
    return skeletons;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Photo Gallery</h1>

      {initialLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {renderSkeletons()}
        </div>
      ) : allImages.length === 0 ? (
        <EmptyGalleryState />
      ) : (
        <>
          {/* Bento Grid Layout */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {visibleImages.map((image, index) => (
              <div
                key={image.id}
                className={`
                  overflow-hidden rounded-lg cursor-pointer transition-transform hover:scale-[1.02] shadow-md
                  ${
                    image.size === "large"
                      ? "col-span-2 row-span-2"
                      : image.size === "medium"
                      ? "col-span-2"
                      : ""
                  }
                `}
                onClick={() => handleImageClick(image, index)}
              >
                <div className="relative w-full h-full aspect-[4/3]">
                  {imageLoadingStates[image.id] && (
                    <Skeleton className="w-full h-full absolute z-10" />
                  )}
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={`object-cover w-full h-full transition-opacity duration-300 ${
                      imageLoadingStates[image.id] ? "opacity-0" : "opacity-100"
                    }`}
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88P/BfwAJeAFs4TkCkAAAAABJRU5ErkJggg=="
                    onLoad={() => handleImageLoaded(image.id)}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Loader for Infinite Scroll */}
          {hasMoreImages && (
            <div
              ref={loaderRef}
              className="flex justify-center items-center py-8"
            >
              {loading ? (
                <>
                  <div className="flex items-center gap-2 mb-8">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Loading more images...</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
                    {renderSkeletons().slice(0, 10)}
                  </div>
                </>
              ) : (
                <Button onClick={loadMoreImages} className="px-6 py-2">
                  Load More ({allImages.length - visibleCount} remaining)
                </Button>
              )}
            </div>
          )}
        </>
      )}

      {/* Image Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-5xl p-0 overflow-hidden bg-background max-h-[100dvh]">
          <DialogTitle className="sr-only">Image Preview</DialogTitle>
          <div className="relative">
            <DialogClose className="absolute right-2 top-2 sm:right-4 sm:top-4 z-20 rounded-full bg-black/60 p-2 text-white hover:bg-black/80 transition-colors">
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </DialogClose>

            {selectedImage && (
              <div className="flex items-center justify-center">
                <Button
                  variant="ghost"
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-background/80 p-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevImage();
                  }}
                >
                  <ChevronLeft className="h-6 w-6" />
                  <span className="sr-only">Previous image</span>
                </Button>

                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src={selectedImage || "/placeholder.svg"}
                    alt={`Photo ${selectedIndex + 1}`}
                    fill
                    sizes="100vw"
                    className="object-contain"
                  />
                </div>

                <Button
                  variant="ghost"
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-background/80 p-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextImage();
                  }}
                >
                  <ChevronRight className="h-6 w-6" />
                  <span className="sr-only">Next image</span>
                </Button>
              </div>
            )}
          </div>

          <div className="p-4 text-center">
            <p className="text-sm text-muted-foreground">
              Image {selectedIndex + 1} of {allImages.length}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PhotoGalleryInfiniteScroll;
