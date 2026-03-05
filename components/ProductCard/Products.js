/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: <explanation> */
/** biome-ignore-all lint/a11y/useSemanticElements: <explanation> */
"use client";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import Script from "next/script";
import { useRouter } from "next/navigation";

const products = [
  {
    id: 13,
    title: "@Work Range",
    imageUrl: "/assets/wallpaper/WorkDisplay.png",
    description:
      "Durable and modern fabrics ideal for office upholstery and high-traffic commercial areas.",
  },
  {
    id: 7,
    title: "Scape Range",
    imageUrl: "/assets/wallpaper/ScapeRangeDisplay.png",
    description:
      "Natural textures and earthy tones suited for sophisticated interiors and boutique spaces.",
  },
  {
    id: 8,
    title: "Slub Plain",
    imageUrl: "/assets/wallpaper/SlubDisplay.png",
    description:
      "Minimalist design with subtle slub texture for versatile decorative uses.",
  },
  {
    id: 4,
    title: "Studio Explore",
    imageUrl: "/assets/wallpaper/StudioExploreDisplay.png",
    description:
      "A vibrant collection ideal for hospitality and creative environments.",
  },
  {
    id: 9,
    title: "Studio Range",
    imageUrl: "/assets/wallpaper/StudioRangeDisplay.png",
    description:
      "Elegant designs crafted for luxurious indoor upholstery projects.",
  },
  {
    id: 10,
    title: "Tailor Range",
    imageUrl: "/assets/wallpaper/TailorRangeDisplay.png",
    description:
      "A refined selection inspired by custom tailoring and fashion-forward textures.",
  },
  {
    id: 5,
    title: "The Great Outdoor",
    imageUrl: "/assets/wallpaper/GreatOutdoorDisplay.png",
    description:
      "Weather-resistant fabrics ideal for patio, poolside, and outdoor furniture.",
  },
  {
    id: 6,
    title: "The Great Plains",
    imageUrl: "/assets/wallpaper/GreatPlainsDisplay.png",
    description:
      "Subtle tones and rugged finishes for rustic interior themes.",
  },
  {
    id: 11,
    title: "Valley Range",
    imageUrl: "/assets/wallpaper/ValleyDisplay.png",
    description:
      "Timeless plains and soft finishes perfect for serene spaces.",
  },
  // {    id: 14,
  //     title: "Solar/Net Range",
  //     imageUrl: "/assets/wallpaper/DiamondDisplay.png",
  // },
  {
    id: 12,
    title: "Westcliff Range",
    imageUrl: "/assets/wallpaper/WestcliffDisplay.png",
    description:
      "Classic patterns blended with premium texture for timeless luxury.",
  },
  {
    id: 1,
    title: "Create Your Own",
    imageUrl: "/assets/wallpaper/Customise.jpg",
    description:
      "Custom fabric printing and personalization options for unique branding.",
  },
];

function Products() {
  const router = useRouter();

  const handleDetailsClick = (id, title) => {
    const product = products.find((p) => p.id === id);
    if (product?.imageUrl) {
      router.push(
        `/collections/?title=${encodeURIComponent(
          title
        )}&imageUrl=${encodeURIComponent(product.imageUrl)}`
      );
    }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProductCollection",
    name: "Helmtex Fabric Collections",
    description: "Explore contract-grade fabrics for upholstery and outdoor use.",
    brand: {
      "@type": "Organization",
      name: "Helm Textile Mills",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Fabric Ranges",
      itemListElement: products.map((p) => ({
        "@type": "Product",
        name: p.title,
        image: `https://www.helmtex.co.za${p.imageUrl}`,
        description: p.description,
      })),
    },
  };

  return (
    <>
      <Script
        id="structured-data-products"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container mx-auto px-4 py-6">
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-slate-800">
            Explore Our Fabric Collections
          </h1>
          <p className="text-gray-600 mt-2">
            Discover contract-grade upholstery, curtain, and outdoor fabric ranges.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((item) => (
            <div
              key={item.id}
              role="button"
              tabIndex={0}
              onClick={() => handleDetailsClick(item.id, item.title)}
              onKeyDown={(e) => e.key === "Enter" && handleDetailsClick(item.id, item.title)}
              className="border rounded-xl p-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 shadow hover:shadow-md transition"
            >
              <Image
                src={item.imageUrl}
                alt={`Helmtex ${item.title} Fabric Collection`}
                className="w-full h-48 object-cover mb-4 rounded-lg"
                width={600}
                height={600}
                priority
              />
              <h2 className="text-lg font-semibold text-blue-700 mb-1">
                {item.title}
              </h2>
              <p className="text-sm text-gray-600 line-clamp-3">{item.description}</p>
              <div className="flex justify-end mt-4">
                <Button
                  className="bg-blue-500/80 hover:bg-blue-500 text-white rounded-xl"
                  onClick={() => handleDetailsClick(item.id, item.title)}
                >
                  More Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Products;
