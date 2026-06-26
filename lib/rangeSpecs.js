const IKUSASA = {
  name: "Ikusasa Fabrics (Pty) Ltd",
  address: "33 Fennell Road, New Centre, Johannesburg, 2001",
  tel: "(011) 499 1460",
  email: "info@ikusasafabrics.co.za",
};

const rangeSpecs = {
  // ─────────────────────────────────────────────────────────────
  // @Work Range
  // ─────────────────────────────────────────────────────────────
  "work-range": {
    cleaningInstructions: "Cold Dry Clean for all Qualities",
    certification: "SABS 726",
    notes: [
      "Minimum seam of 15mm and 4–5 stitches per cm (SABS 726)",
      "Not to be used for master samples",
      "Shade variations can occur from batch to batch",
    ],
    disclaimer: "Cut fabric is non-refundable",
    distributor: IKUSASA,
    groups: [
      {
        designCodes: ["9508", "9530"],
        composition: "100% Olefin",
        finishedWidth: "153 cm",
        fabricWeight: "430 g/m",
        usage: "Upholstery",
        abrasionResistance: "35 000+ rubs",
        colourFastness: { toLight: "6–7", toRubbing: "4–5", toDrycleaning: "4–5", toPerspiration: "4–5" },
        seamSlippage: ">180 N",
        tensileStrength: ">400 N",
      },
      {
        designCodes: ["9833", "9837", "9845", "9841"],
        composition: "57% recycled Polyester, 43% Olefin",
        finishedWidth: "140 cm",
        fabricWeight: "505 g/m",
        usage: "Upholstery",
        abrasionResistance: "35 000+ rubs",
        colourFastness: { toLight: "6–7", toRubbing: "4–5", toDrycleaning: "4–5", toPerspiration: "4–5" },
        seamSlippage: ">180 N",
        tensileStrength: ">400 N",
      },
      {
        designCodes: ["9838", "HTM 14 Grey", "9839", "9840", "9844"],
        composition: "100% Olefin",
        finishedWidth: "140 cm",
        fabricWeight: "420 g/m",
        usage: "Upholstery",
        abrasionResistance: "45 000+ rubs",
        colourFastness: { toLight: "6–7", toRubbing: "4–5", toDrycleaning: "4–5", toPerspiration: "4–5" },
        seamSlippage: ">180 N",
        tensileStrength: "2 800 N",
      },
      {
        designCodes: ["Net 300"],
        composition: "100% Polyester",
        finishedWidth: "180 cm",
        fabricWeight: "400 g/m",
        usage: "Upholstery",
        abrasionResistance: "50 000+ rubs",
        colourFastness: { toLight: "6–7", toRubbing: "4–5", toDrycleaning: "4–5", toPerspiration: "4–5" },
        seamSlippage: "—",
        tensileStrength: ">3 000 N",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // Studio Range
  // ─────────────────────────────────────────────────────────────
  "studio-range": {
    cleaningInstructions: "Cold Dry Clean for all Qualities",
    certification: "SABS 726",
    notes: [
      "Not to be used for master samples",
      "Shade variations can occur from batch to batch",
      "Minimum seam of 15mm and 4–5 stitches per cm (SABS 726)",
    ],
    disclaimer: "Cut fabric is non-refundable",
    distributor: IKUSASA,
    groups: [
      {
        designCodes: ["Studio Plain"],
        composition: "100% Olefin",
        finishedWidth: "140 cm",
        fabricWeight: "550 g/m",
        usage: "Upholstery",
        patternRepeat: "Plain",
        colourFastness: { toLight: "6–7" },
        seamSlippage: "220 N",
        tensileStrength: "660 N",
        abrasionResistance: "50 000+ rubs",
      },
      {
        designCodes: ["Stripes"],
        composition: "25% Polyester, 75% Olefin",
        finishedWidth: "140 cm",
        fabricWeight: "450 g/m",
        usage: "Upholstery",
        patternRepeat: "Railroaded",
        colourFastness: { toLight: "6–7" },
        seamSlippage: "220 N",
        tensileStrength: "660 N",
        abrasionResistance: "50 000+ rubs",
      },
      {
        designCodes: ["Linear"],
        composition: "25% Polyester, 75% Olefin",
        finishedWidth: "140 cm",
        fabricWeight: "480 g/m",
        usage: "Upholstery",
        patternRepeat: "75 cm × 64 cm",
        colourFastness: { toLight: "6–7" },
        seamSlippage: "220 N",
        tensileStrength: "660 N",
        abrasionResistance: "50 000+ rubs",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // Studio Explore
  // ─────────────────────────────────────────────────────────────
  "studio-explore": {
    cleaningInstructions:
      "Cold Dry Cleaning. Brush off loose dirt and rinse with lukewarm water. Use a mild natural soap solution (max 40°C). Rinse thoroughly and air dry. Store in a dry, well-ventilated area.",
    certification: "SABS 726",
    notes: [
      "Not to be used for master samples",
      "Shade variations can occur from batch to batch",
      "Minimum seam of 15mm and 4–5 stitches per cm (SABS 726)",
    ],
    disclaimer: "Cut fabric is non-refundable",
    distributor: IKUSASA,
    groups: [
      {
        designCodes: ["Terrain"],
        composition: "22% Polyester, 78% Olefin",
        localContent: "94%",
        finishedWidth: "145 cm",
        fabricWeight: "411 g/m",
        usage: "Upholstery",
        patternRepeat: "1.5 × 2 cm",
        abrasionResistance: "45 000+ rubs",
      },
      {
        designCodes: ["Explore"],
        composition: "26% Polyester, 74% Olefin",
        localContent: "94%",
        finishedWidth: "145 cm",
        fabricWeight: "411 g/m",
        usage: "Upholstery",
        patternRepeat: "37 × 72 cm",
        abrasionResistance: "45 000+ rubs",
      },
      {
        designCodes: ["Trail"],
        composition: "22% Polyester, 78% Olefin",
        localContent: "94%",
        finishedWidth: "145 cm",
        fabricWeight: "483 g/m",
        usage: "Upholstery",
        patternRepeat: "9 × 12 cm",
        abrasionResistance: "45 000+ rubs",
      },
      {
        designCodes: ["Route"],
        composition: "26% Polyester, 74% Olefin",
        localContent: "93%",
        finishedWidth: "145 cm",
        fabricWeight: "361 g/m",
        usage: "Upholstery",
        patternRepeat: "Railroaded × 11 cm",
        abrasionResistance: "45 000+ rubs",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // The Great Outdoor
  // ─────────────────────────────────────────────────────────────
  "the-great-outdoor": {
    cleaningInstructions:
      "Brush off loose dirt and rinse with lukewarm water. Use a mild natural soap solution (max 40°C). Rinse thoroughly and air dry. Machine washable on silk or wool cycle. Store in a dry, well-ventilated area.",
    warranty: "5 Year Warranty (T&C's apply)",
    notes: [
      "All fabrics carry a 5 Year Warranty (T&C's apply) and if looked after will retain the fresh look as on the day of purchase",
      "Not to be used for master samples",
      "Shade variations can occur from batch to batch",
    ],
    disclaimer: "Cut fabric is non-refundable",
    distributor: IKUSASA,
    groups: [
      {
        designCodes: ["Glencarin"],
        composition: "57% Acrylic, 43% Polyester",
        finishedWidth: "145 cm",
        usage: "Upholstery",
        finishType: "Easyclean, Anti-microbal, Anti-mildew",
        warrantyDuration: "3 years (normal wear & tear)",
        uvResistance: "1 500 hours",
        colourFastness: { toLight: "8 (Blue scale)" },
        seamSlippage: ">180 N",
        tensileStrength: "Warp 800 N / Weft 1 000 N",
        abrasionResistance: "25 000+ rubs",
        bowSkew: "< 2%",
      },
      {
        designCodes: ["Kommetjie"],
        composition: "51% Acrylic, 49% Polyester",
        finishedWidth: "145 cm",
        usage: "Upholstery",
        finishType: "Easyclean, Anti-microbal, Anti-mildew",
        warrantyDuration: "3 years (normal wear & tear)",
        uvResistance: "1 500 hours",
        colourFastness: { toLight: "8 (Blue scale)" },
        seamSlippage: ">180 N",
        tensileStrength: "Warp 800 N / Weft 1 000 N",
        abrasionResistance: "50 000+ rubs",
        bowSkew: "< 2%",
      },
      {
        designCodes: ["Macassar"],
        composition: "51% Acrylic, 49% Polyester",
        finishedWidth: "145 cm",
        usage: "Upholstery",
        finishType: "Easyclean, Anti-microbal, Anti-mildew",
        warrantyDuration: "3 years (normal wear & tear)",
        uvResistance: "1 500 hours",
        colourFastness: { toLight: "8 (Blue scale)" },
        seamSlippage: ">180 N",
        tensileStrength: "Warp 800 N / Weft 1 000 N",
        abrasionResistance: "50 000+ rubs",
        bowSkew: "< 2%",
      },
      {
        designCodes: ["Milnerton"],
        composition: "54% Acrylic, 46% Polyester",
        finishedWidth: "145 cm",
        usage: "Upholstery",
        finishType: "Easyclean, Anti-microbal, Anti-mildew",
        warrantyDuration: "3 years (normal wear & tear)",
        uvResistance: "1 500 hours",
        colourFastness: { toLight: "8 (Blue scale)" },
        seamSlippage: ">180 N",
        tensileStrength: "Warp 800 N / Weft 1 000 N",
        abrasionResistance: "40 000+ rubs",
        bowSkew: "< 2%",
      },
      {
        designCodes: ["Monwabisi"],
        composition: "51% Acrylic, 49% Polyester",
        finishedWidth: "145 cm",
        usage: "Upholstery",
        finishType: "Easyclean, Anti-microbal, Anti-mildew",
        warrantyDuration: "3 years (normal wear & tear)",
        uvResistance: "1 500 hours",
        colourFastness: { toLight: "8 (Blue scale)" },
        seamSlippage: ">180 N",
        tensileStrength: "Warp 800 N / Weft 1 000 N",
        abrasionResistance: "50 000+ rubs",
        bowSkew: "< 2%",
      },
      {
        designCodes: ["Noordhoek"],
        composition: "51% Acrylic, 49% Polyester",
        finishedWidth: "145 cm",
        usage: "Upholstery",
        finishType: "Easyclean, Anti-microbal, Anti-mildew",
        warrantyDuration: "3 years (normal wear & tear)",
        uvResistance: "1 500 hours",
        colourFastness: { toLight: "8 (Blue scale)" },
        seamSlippage: ">180 N",
        tensileStrength: "Warp 800 N / Weft 1 000 N",
        abrasionResistance: "50 000+ rubs",
        bowSkew: "< 2%",
      },
      {
        designCodes: ["Pelican"],
        composition: "54% Acrylic, 46% Polyester",
        finishedWidth: "145 cm",
        usage: "Upholstery",
        finishType: "Easyclean, Anti-microbal, Anti-mildew",
        warrantyDuration: "3 years (normal wear & tear)",
        uvResistance: "1 500 hours",
        colourFastness: { toLight: "8 (Blue scale)" },
        seamSlippage: ">180 N",
        tensileStrength: "Warp 800 N / Weft 1 000 N",
        abrasionResistance: "40 000+ rubs",
        bowSkew: "< 2%",
      },
      {
        designCodes: ["Scarborough"],
        composition: "51% Acrylic, 49% Polyester",
        finishedWidth: "145 cm",
        usage: "Upholstery",
        finishType: "Easyclean, Anti-microbal, Anti-mildew",
        warrantyDuration: "3 years (normal wear & tear)",
        uvResistance: "1 500 hours",
        colourFastness: { toLight: "8 (Blue scale)" },
        seamSlippage: ">180 N",
        tensileStrength: "Warp 800 N / Weft 1 000 N",
        abrasionResistance: "50 000+ rubs",
        bowSkew: "< 2%",
      },
      {
        designCodes: ["Shelly"],
        composition: "51% Acrylic, 49% Polyester",
        finishedWidth: "145 cm",
        usage: "Upholstery",
        finishType: "Easyclean, Anti-microbal, Anti-mildew",
        warrantyDuration: "3 years (normal wear & tear)",
        uvResistance: "1 500 hours",
        colourFastness: { toLight: "8 (Blue scale)" },
        seamSlippage: ">180 N",
        tensileStrength: "Warp 800 N / Weft 1 000 N",
        abrasionResistance: "40 000+ rubs",
        bowSkew: "< 2%",
      },
      {
        designCodes: ["Strand"],
        composition: "54% Acrylic, 46% Polyester",
        finishedWidth: "145 cm",
        usage: "Upholstery",
        finishType: "Easyclean, Anti-microbal, Anti-mildew",
        warrantyDuration: "3 years (normal wear & tear)",
        uvResistance: "1 500 hours",
        colourFastness: { toLight: "8 (Blue scale)" },
        seamSlippage: ">180 N",
        tensileStrength: "Warp 800 N / Weft 1 000 N",
        abrasionResistance: "40 000+ rubs",
        bowSkew: "< 2%",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // Scape Range  (spec sheet titled "Scape Plain")
  // ─────────────────────────────────────────────────────────────
  "scape-range": {
    cleaningInstructions:
      "Cold Dry Clean or Delicate Wash. Brush off loose dirt and rinse with lukewarm water. Use a mild natural soap solution (max 40°C). Rinse thoroughly and air dry. Machine washable on delicate cycle — NO TUMBLE DRY. Store in a dry, well-ventilated area.",
    certification: "SABS 726",
    notes: [
      "Not to be used for master samples",
      "Shade variations can occur from batch to batch",
      "Minimum seam of 15mm and 4–5 stitches per cm (SABS 726)",
    ],
    disclaimer: "Cut fabric is non-refundable",
    distributor: IKUSASA,
    groups: [
      {
        designCodes: ["All Designs"],
        localContent: "99%",
        composition: "26% Polyester, 74% Olefin",
        finishedWidth: "140 cm",
        fabricWeight: "364 g/m",
        usage: "Upholstery",
        abrasionResistance: "25 000+ rubs",
        seamSlippage: ">180 N",
        tensileStrength: ">640 N",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // The Great Plains
  // ─────────────────────────────────────────────────────────────
  "the-great-plains": {
    cleaningInstructions:
      "Cold Dry Clean. Brush off loose dirt and rinse with lukewarm water. Use a mild natural soap solution (max 40°C). Rinse thoroughly and air dry. Store in a dry, well-ventilated area.",
    certification: "SABS 726",
    notes: [
      "Not to be used for master samples",
      "Shade variations can occur from batch to batch",
      "Minimum seam of 15mm and 4–5 stitches per cm (SABS 726)",
    ],
    disclaimer: "Cut fabric is non-refundable",
    distributor: IKUSASA,
    groups: [
      {
        designCodes: ["Karoo"],
        composition: "100% Olefin",
        localContent: "99%",
        finishedWidth: "145 cm",
        fabricWeight: "420 g/m",
        usage: "Upholstery",
        patternRepeat: "Plain",
        abrasionResistance: "45 000+ rubs",
      },
      {
        designCodes: ["Okavango"],
        composition: "68% Olefin, 32% Polyester",
        localContent: "99%",
        finishedWidth: "145 cm",
        fabricWeight: "460 g/m",
        usage: "Upholstery",
        patternRepeat: "Plain",
        abrasionResistance: "45 000+ rubs",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // Valley Range
  // ─────────────────────────────────────────────────────────────
  "valley-range": {
    cleaningInstructions:
      "Machine washable on delicate cycle only — NO TUMBLE DRY. Brush off loose dirt and rinse with lukewarm water. Use a mild natural soap solution (max 40°C). Rinse thoroughly and air dry. Store in a dry, well-ventilated area.",
    certification: "SABS 726",
    notes: [
      "Not to be used for master samples",
      "Shade variations can occur from batch to batch",
      "Minimum seam of 15mm and 4–5 stitches per cm (SABS 726)",
    ],
    disclaimer: "Cut fabric is non-refundable",
    distributor: IKUSASA,
    groups: [
      {
        designCodes: ["Houndsly"],
        composition: "78% Polyester (43% recycled), 22% Cotton",
        localContent: "94%",
        finishedWidth: "145 cm",
        fabricWeight: "543 g/m",
        usage: "Upholstery / Curtains",
        finishType: "EASYCLEAN®",
        patternRepeat: "30 × 30 cm",
        abrasionResistance: "45 000+ rubs",
      },
      {
        designCodes: ["Herring"],
        composition: "100% Polyester (15% recycled)",
        localContent: "83%",
        finishedWidth: "145 cm",
        fabricWeight: "522 g/m",
        usage: "Upholstery / Curtains",
        finishType: "EASYCLEAN®",
        patternRepeat: "25 × 24 cm",
        abrasionResistance: "45 000+ rubs",
      },
      {
        designCodes: ["Pathway"],
        composition: "100% Polyester (76% recycled)",
        localContent: "94%",
        finishedWidth: "145 cm",
        fabricWeight: "408 g/m",
        usage: "Upholstery / Curtains",
        finishType: "EASYCLEAN®",
        patternRepeat: "Railroaded × 62 cm",
        abrasionResistance: "45 000+ rubs",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // Solar / Net Range
  // ─────────────────────────────────────────────────────────────
  "solar-net-range": {
    cleaningInstructions:
      "Machine washable on delicate cycle — NO TUMBLE DRY. Brush off loose dirt and rinse with lukewarm water. Use a mild natural soap solution (max 40°C). Rinse thoroughly and air dry. Store in a dry, well-ventilated area.",
    notes: [
      "Imported product",
      "Not to be used for master samples",
      "Shade variations can occur from batch to batch",
    ],
    disclaimer: "Cut fabric is non-refundable",
    distributor: IKUSASA,
    groups: [
      {
        designCodes: ["Solar (Imported)"],
        composition: "100% Polyester",
        finishedWidth: "142 cm",
        fabricWeight: "612 g/m",
        usage: "Curtains / Upholstery",
        abrasionResistance: "100 000+ rubs",
        seamSlippage: "N/A",
        tensileStrength: "N/A",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // Tailor Range
  // ─────────────────────────────────────────────────────────────
  "tailor-range": {
    cleaningInstructions:
      "Machine washable on delicate cycle — NO TUMBLE DRY. Brush off loose dirt and rinse with lukewarm water. Use a mild natural soap solution (max 40°C). Rinse thoroughly and air dry. Store in a dry, well-ventilated area.",
    certification: "SABS 726",
    notes: [
      "Not to be used for master samples",
      "Shade variations can occur from batch to batch",
      "Minimum seam of 15mm and 4–5 stitches per cm (SABS 726)",
    ],
    disclaimer: "Cut fabric is non-refundable",
    distributor: IKUSASA,
    groups: [
      {
        designCodes: ["All Designs"],
        localContent: "93%",
        composition: "100% Polyester (52% recycled)",
        finishedWidth: "145 cm",
        fabricWeight: "413 g/m",
        usage: "Upholstery, Curtaining",
        finishType: "EASYCLEAN®",
        abrasionResistance: "25 000+ rubs",
        seamSlippage: ">180 N",
        tensileStrength: ">640 N",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // Slub Plain
  // ─────────────────────────────────────────────────────────────
  "slub-plain": {
    cleaningInstructions:
      "Cold Dry Clean or Delicate Wash. Machine washable on delicate cycle — NO TUMBLE DRY. Brush off loose dirt and rinse with lukewarm water. Use a mild natural soap solution (max 40°C). Rinse thoroughly and air dry. Store in a dry, well-ventilated area.",
    certification: "SABS 726",
    notes: [
      "Not to be used for master samples",
      "Shade variations can occur from batch to batch",
      "Minimum seam of 15mm and 4–5 stitches per cm (SABS 726)",
    ],
    disclaimer: "Cut fabric is non-refundable",
    distributor: IKUSASA,
    groups: [
      {
        designCodes: ["All Designs"],
        localContent: "95%",
        composition: "46% Cotton, 54% Olefin",
        finishedWidth: "140 cm",
        fabricWeight: "436 g/m",
        usage: "Upholstery",
        abrasionResistance: "50 000+ rubs",
        seamSlippage: ">180 N",
        tensileStrength: ">640 N",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // Homegrown Outdoor  (range not yet in website catalog —
  //   spec data stored here ready for when it is added)
  // ─────────────────────────────────────────────────────────────
  "homegrown-outdoor": {
    cleaningInstructions:
      "Cold Dry Cleaning. Brush off loose dirt and rinse with lukewarm water. Use a mild natural soap solution (max 40°C). Rinse thoroughly and air dry. Store in a dry, well-ventilated area.",
    certification: "SABS 726",
    notes: [
      "Not to be used for master samples",
      "Shade variations can occur from batch to batch",
      "Minimum seam of 15mm and 4–5 stitches per cm (SABS 726)",
    ],
    disclaimer: "Cut fabric is non-refundable",
    distributor: IKUSASA,
    groups: [
      {
        designCodes: ["Shoowa"],
        composition: "27% Acrylic, 28% Polyester, 45% Olefin",
        localContent: "71%",
        finishedWidth: "145 cm",
        fabricWeight: "658 g/m",
        usage: "Upholstery",
        finishType: "Easyclean, Anti-microbal, Anti-mildew",
        warrantyDuration: "3 years (normal wear & tear)",
        uvResistance: "1 500 hours",
        colourFastness: { toLight: "8 (Blue scale)" },
        patternRepeat: "37.5 × 23 cm",
        abrasionResistance: "50 000+ rubs",
      },
      {
        designCodes: ["Raffia"],
        composition: "14% Acrylic, 26% Polyester, 60% Olefin",
        localContent: "93%",
        finishedWidth: "145 cm",
        fabricWeight: "411 g/m",
        usage: "Upholstery",
        finishType: "Easyclean, Anti-microbal, Anti-mildew",
        warrantyDuration: "3 years (normal wear & tear)",
        uvResistance: "1 500 hours",
        colourFastness: { toLight: "8 (Blue scale)" },
        patternRepeat: "Plain",
        abrasionResistance: "50 000+ rubs",
      },
      {
        designCodes: ["Mbali"],
        composition: "21% Acrylic, 29% Polyester, 50% Olefin",
        localContent: "86%",
        finishedWidth: "145 cm",
        fabricWeight: "483 g/m",
        usage: "Upholstery",
        finishType: "Easyclean, Anti-microbal, Anti-mildew",
        warrantyDuration: "3 years (normal wear & tear)",
        uvResistance: "1 500 hours",
        colourFastness: { toLight: "8 (Blue scale)" },
        patternRepeat: "Railroaded × 10 cm",
        abrasionResistance: "100 000+ rubs",
      },
      {
        designCodes: ["Inga"],
        composition: "27% Acrylic, 28% Polyester, 45% Olefin",
        localContent: "71%",
        finishedWidth: "145 cm",
        fabricWeight: "361 g/m",
        usage: "Upholstery",
        finishType: "Easyclean, Anti-microbal, Anti-mildew",
        warrantyDuration: "3 years (normal wear & tear)",
        uvResistance: "1 500 hours",
        colourFastness: { toLight: "8 (Blue scale)" },
        patternRepeat: "9 × 9 cm",
        abrasionResistance: "50 000+ rubs",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // Sense  (range not yet in website catalog —
  //   spec data stored here ready for when it is added)
  // ─────────────────────────────────────────────────────────────
  "sense": {
    cleaningInstructions:
      "Machine washable on delicate cycle — NO TUMBLE DRY. Brush off loose dirt and rinse with lukewarm water. Use a mild natural soap solution (max 40°C). Rinse thoroughly and air dry. Store in a dry, well-ventilated area.",
    certification: "SABS 726",
    notes: [
      "Not to be used for master samples",
      "Shade variations can occur from batch to batch",
      "Minimum seam of 15mm and 4–5 stitches per cm (SABS 726)",
    ],
    disclaimer: "Cut fabric is non-refundable",
    distributor: IKUSASA,
    groups: [
      {
        designCodes: ["All Designs"],
        localContent: "98%",
        composition: "100% Polyester",
        finishedWidth: "145–148 cm",
        fabricWeight: "542 g/m",
        usage: "Curtains / Upholstery",
        finishType: "EASYCLEAN® treated",
        abrasionResistance: "45 000+ rubs",
        seamSlippage: ">180 N",
        tensileStrength: ">640 N",
      },
    ],
  },
};

export function getRangeSpecs(slug) {
  return rangeSpecs[slug] || null;
}
