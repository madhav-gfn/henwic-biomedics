export interface Ingredient {
  id: string;
  name: string;
  role: string;
  symbol: string;
}

export const HENMINO_INGREDIENTS: Ingredient[] = [
  {
    id: "l-carnitine",
    name: "L-Carnitine",
    role: "Cellular energy transport across mitochondrial membranes.",
    symbol: "LC",
  },
  {
    id: "l-arginine",
    name: "L-Arginine",
    role: "Nitric oxide precursor supporting vascular performance.",
    symbol: "LA",
  },
  {
    id: "magnesium",
    name: "Magnesium",
    role: "Electrolyte balance and neuromuscular recovery.",
    symbol: "Mg",
  },
  {
    id: "vitamin-e",
    name: "Vitamin E",
    role: "Antioxidant shield for oxidative cellular stress.",
    symbol: "VE",
  },
  {
    id: "vitamin-b12",
    name: "Vitamin B12",
    role: "Red blood cell synthesis and metabolic clarity.",
    symbol: "B12",
  },
];
