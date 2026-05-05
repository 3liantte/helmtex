const RANGE_PREFIXES = {
  "Create Your Own": ["Custom Design"],
  "Studio Explore": ["Explore", "Route", "Terrain", "Trail"],
  "The Great Outdoor": [
    "Shelly",
    "Milnerton",
    "Noordhoek",
    "Pelican",
    "Glencarin",
    "Strand",
    "Scarborough",
    "Macassar",
    "Kommetjie",
    "Monwabisi",
  ],
  "The Great Plains": ["Karoo", "Okavango", "Serengetti"],
  "Scape Range": ["Scape"],
  "Slub Plain": ["Slub Plain"],
  "Studio Range": ["Studio", "Linear", "Smart"],
  "Tailor Range": ["Tailor"],
  "Valley Range": ["Houndsly", "Herring", "Pathway", "Sense"],
  "Westcliff Range": ["Lawley", "Westcliff", "Wexford", "Kerry", "Carlow"],
  "Solar/Net Range": ["Solar"],
  "@Work Range": ["HTM 14", "Net 300", "Contract", "Fusion", "HT"],
};

const DIAMOND_PATTERNS = ["Sprinkle", "Dot", "Diamond", "Star", "Tweed", "Twill"];

const COLOUR_GROUPS = [
  {
    key: "dark",
    label: "Black",
    keywords: [
      "black",
      "charcoal",
      "graphite",
      "night",
      "onyx",
      "smoke",
      "storm",
      "shadow",
      "mascara",
    ],
    colors: ["#35373d", "#101114"],
  },
  {
    key: "light",
    label: "White",
    keywords: ["white", "ivory", "chalk", "natural", "pearl", "peal"],
    colors: ["#f6f2e8", "#ded5c4"],
  },
  {
    key: "grey",
    label: "Grey",
    keywords: [
      "grey",
      "gray",
      "silver",
      "platinum",
      "pebble",
      "linen",
      "glacier",
      "stucco",
      "neutral",
      "relic",
    ],
    colors: ["#d0d5dd", "#8e98a7"],
  },
  {
    key: "neutral",
    label: "Neutral",
    keywords: [
      "taupe",
      "stone",
      "sand",
      "beige",
      "driftwood",
      "oatmeal",
      "cobblestone",
      "parchment",
      "flax",
      "biscuit",
      "latte",
      "coconut",
      "canvas",
      "rope",
      "earth",
    ],
    colors: ["#c7ad8b", "#8c6b4f"],
  },
  {
    key: "brown",
    label: "Brown",
    keywords: [
      "brown",
      "coffee",
      "chocolate",
      "cigar",
      "bean",
      "chestnut",
      "clay",
      "caramel",
      "rust",
      "cherokee",
      "wood",
      "cappuccino",
      "weasel",
      "beaver",
    ],
    colors: ["#9b6b43", "#5c3b23"],
  },
  {
    key: "red",
    label: "Red",
    keywords: [
      "red",
      "flame",
      "crimson",
      "ruby",
      "cherry",
      "cranberry",
      "coral",
      "rouge",
      "rose",
      "wine",
      "claret",
      "rhubarb",
      "sunset",
      "fire",
      "brick",
      "inferno",
      "berry",
      "jaffa",
    ],
    colors: ["#db4d3c", "#8e1d17"],
  },
  {
    key: "orange",
    label: "Orange",
    keywords: [
      "orange",
      "tangerine",
      "gold",
      "butterscotch",
      "ochre",
      "amber",
      "dandelion",
      "citrus",
    ],
    colors: ["#f1a208", "#d97706"],
  },
  {
    key: "yellow-green",
    label: "Yellow / Lime",
    keywords: [
      "yellow",
      "chartreuse",
      "lime",
      "acid",
      "avocado",
      "pesto",
      "goblin",
      "greenery",
    ],
    colors: ["#c6d33f", "#859a1d"],
  },
  {
    key: "green",
    label: "Green",
    keywords: [
      "green",
      "emerald",
      "moss",
      "meadow",
      "olive",
      "ivy",
      "jade",
      "military",
      "malachite",
      "aloe",
      "fresh",
      "spearmint",
      "grass",
      "frog",
      "everglade",
      "bottle",
      "hunter",
    ],
    colors: ["#4d8c62", "#1f5a36"],
  },
  {
    key: "blue",
    label: "Blue",
    keywords: [
      "blue",
      "navy",
      "aqua",
      "teal",
      "turquoise",
      "pool",
      "royal",
      "cobalt",
      "bahama",
      "bermuda",
      "peacock",
      "sky",
      "indigo",
      "lake",
      "nautical",
      "water",
      "airforce",
      "ocean",
      "oceans",
      "denim",
      "azure",
      "steel",
      "dolphin",
      "midnight",
    ],
    colors: ["#4f86c6", "#0f4c81"],
  },
  {
    key: "purple",
    label: "Purple",
    keywords: ["purple", "amethyst", "jubilee", "soviet"],
    colors: ["#9b74db", "#5b3e9b"],
  },
];

function matchKnownPrefix(content, prefixes = []) {
  const prefix = [...prefixes]
    .sort((left, right) => right.length - left.length)
    .find(
      (candidate) => content === candidate || content.startsWith(`${candidate} `)
    );

  if (!prefix) {
    return null;
  }

  return {
    fabricType: prefix,
    colour: content.slice(prefix.length).trim(),
  };
}

function parseDiamondRange(content) {
  const words = content.split(/\s+/);
  const patternIndex = words.findIndex((word) =>
    DIAMOND_PATTERNS.includes(word)
  );

  if (words[0] === "Tartan") {
    return {
      fabricType: "Tartan",
      colour: words.slice(1).join(" "),
    };
  }

  if (patternIndex === 0) {
    return {
      fabricType: words[0],
      colour: words.slice(1).join(" "),
    };
  }

  if (patternIndex > 0) {
    return {
      fabricType: words[patternIndex],
      colour: words.slice(0, patternIndex).join(" "),
    };
  }

  return {
    fabricType: "",
    colour: content,
  };
}

function hashString(value) {
  return [...value].reduce(
    (hash, character) => character.charCodeAt(0) + ((hash << 5) - hash),
    0
  );
}

function buildFallbackColourFamily(colourName = "") {
  const normalizedColour = colourName.toLowerCase() || "other";
  const hue = Math.abs(hashString(normalizedColour)) % 360;

  return {
    key: `other-${normalizedColour.replace(/\s+/g, "-")}`,
    label: colourName || "Other",
    colors: [`hsl(${hue} 55% 72%)`, `hsl(${hue} 48% 42%)`],
  };
}

export function getFabricAttributes(rangeName, content = "") {
  const normalizedContent = content.trim();

  if (!normalizedContent) {
    return {
      fabricType: "",
      colour: "",
    };
  }

  if (rangeName === "Diamond Range") {
    return parseDiamondRange(normalizedContent);
  }

  const prefixMatch = matchKnownPrefix(
    normalizedContent,
    RANGE_PREFIXES[rangeName]
  );

  if (prefixMatch) {
    return prefixMatch;
  }

  return {
    fabricType: "",
    colour: normalizedContent,
  };
}

export function getUniqueFilterOptions(values = []) {
  return [...new Set(values.filter(Boolean))].sort((left, right) =>
    left.localeCompare(right)
  );
}

export function getColourFamily(colourName = "") {
  const normalizedColour = colourName.toLowerCase();
  const matchedGroup = COLOUR_GROUPS.find((group) =>
    group.keywords.some((keyword) => normalizedColour.includes(keyword))
  );

  return matchedGroup || buildFallbackColourFamily(colourName);
}

export function getGroupedColourOptions(values = []) {
  const grouped = values.reduce((map, value) => {
    if (!value) {
      return map;
    }

    const family = getColourFamily(value);
    const existing = map.get(family.key);

    if (existing) {
      existing.count += 1;
      return map;
    }

    map.set(family.key, {
      key: family.key,
      label: family.label,
      count: 1,
      colors: family.colors,
    });

    return map;
  }, new Map());

  return [...grouped.values()].sort((left, right) => {
    const leftIndex = COLOUR_GROUPS.findIndex((group) => group.key === left.key);
    const rightIndex = COLOUR_GROUPS.findIndex(
      (group) => group.key === right.key
    );

    if (leftIndex === -1 && rightIndex === -1) {
      return left.label.localeCompare(right.label);
    }

    if (leftIndex === -1) {
      return 1;
    }

    if (rightIndex === -1) {
      return -1;
    }

    return leftIndex - rightIndex;
  });
}

export function getColourSwatchStyle(colourName = "") {
  const colors = getColourFamily(colourName).colors;

  return {
    background: `linear-gradient(145deg, ${colors[0]}, ${colors[1]})`,
    borderColor: "rgba(120, 113, 108, 0.25)",
    boxShadow: "inset 0 1px 2px rgba(255,255,255,0.35)",
  };
}
