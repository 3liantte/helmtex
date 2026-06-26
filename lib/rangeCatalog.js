export const rangeCatalog = [
  {
    id: 13,
    title: "@Work Range",
    slug: "work-range",
    imageUrl: "/assets/wallpaper/WorkDisplay.png",
    description:
      "Durable and modern fabrics ideal for office upholstery and high-traffic commercial areas.",
  },
  {
    id: 2,
    title: "Diamond Range",
    slug: "diamond-range",
    imageUrl: "/assets/wallpaper/DiamondRange.jpg",
    description:
      "Classic woven patterns and enduring contract colours for everyday upholstery projects.",
  },
  {
    id: 7,
    title: "Scape Range",
    slug: "scape-range",
    imageUrl: "/assets/wallpaper/ScapeRangeDisplay.png",
    description:
      "Natural textures and earthy tones suited for sophisticated interiors and boutique spaces.",
  },
  {
    id: 8,
    title: "Slub Plain",
    slug: "slub-plain",
    imageUrl: "/assets/wallpaper/SlubDisplay.png",
    description:
      "Minimalist design with subtle slub texture for versatile decorative uses.",
  },
  {
    id: 14,
    title: "Solar/Net Range",
    slug: "solar-net-range",
    imageUrl: "/assets/wallpaper/DiamondDisplay.png",
    description:
      "Functional solar and mesh fabrics designed for task seating and practical applications.",
  },
  {
    id: 4,
    title: "Studio Explore",
    slug: "studio-explore",
    imageUrl: "/assets/wallpaper/StudioExploreDisplay.png",
    description:
      "A vibrant collection ideal for hospitality and creative environments.",
  },
  {
    id: 9,
    title: "Studio Range",
    slug: "studio-range",
    imageUrl: "/assets/wallpaper/StudioRangeDisplay.png",
    description:
      "Elegant designs crafted for luxurious indoor upholstery projects.",
  },
  {
    id: 10,
    title: "Tailor Range",
    slug: "tailor-range",
    imageUrl: "/assets/wallpaper/TailorRangeDisplay.png",
    description:
      "A refined selection inspired by custom tailoring and fashion-forward textures.",
  },
  {
    id: 5,
    title: "The Great Outdoor",
    slug: "the-great-outdoor",
    imageUrl: "/assets/wallpaper/GreatOutdoorDisplay.png",
    description:
      "Weather-resistant fabrics ideal for patio, poolside, and outdoor furniture.",
  },
  {
    id: 6,
    title: "The Great Plains",
    slug: "the-great-plains",
    imageUrl: "/assets/wallpaper/GreatPlainsDisplay.png",
    description:
      "Subtle tones and rugged finishes for rustic interior themes.",
  },
  {
    id: 11,
    title: "Valley Range",
    slug: "valley-range",
    imageUrl: "/assets/wallpaper/ValleyDisplay.png",
    description:
      "Timeless plains and soft finishes perfect for serene spaces.",
  },
  {
    id: 12,
    title: "Westcliff Range",
    slug: "westcliff-range",
    imageUrl: "/assets/wallpaper/WestcliffDisplay.png",
    description:
      "Classic patterns blended with premium texture for timeless luxury.",
  },
  {
    id: 1,
    title: "Create Your Own",
    slug: "create-your-own",
    imageUrl: "/assets/wallpaper/Customise.jpg",
    description:
      "Custom fabric printing and personalization options for unique branding.",
  },
];

export const rangeCatalogMap = Object.fromEntries(
  rangeCatalog.map((range) => [range.title, range])
);

const rangeCatalogBySlug = Object.fromEntries(
  rangeCatalog.map((range) => [range.slug, range])
);

export function getRangeMeta(title) {
  return rangeCatalogMap[title] || null;
}

export function getRangeBySlug(slug) {
  return rangeCatalogBySlug[slug] || null;
}

export function getRangeSlug(title) {
  return rangeCatalogMap[title]?.slug || null;
}
