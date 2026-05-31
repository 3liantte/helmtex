export const rangeCatalog = [
  {
    id: 13,
    title: "@Work Range",
    imageUrl: "/assets/wallpaper/WorkDisplay.png",
    description:
      "Durable and modern fabrics ideal for office upholstery and high-traffic commercial areas.",
  },
  {
    id: 2,
    title: "Diamond Range",
    imageUrl: "/assets/wallpaper/DiamondRange.jpg",
    description:
      "Classic woven patterns and enduring contract colours for everyday upholstery projects.",
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
    id: 14,
    title: "Solar/Net Range",
    imageUrl: "/assets/wallpaper/DiamondDisplay.png",
    description:
      "Functional solar and mesh fabrics designed for task seating and practical applications.",
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

export const rangeCatalogMap = Object.fromEntries(
  rangeCatalog.map((range) => [range.title, range])
);

export function getRangeMeta(title) {
  return rangeCatalogMap[title] || null;
}
