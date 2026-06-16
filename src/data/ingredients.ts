export interface Ingredient {
  id: string;
  name: string;
  role: string;
  symbol: string;
  dosage: string;
}

export const HENMINO_INGREDIENTS: Ingredient[] = [
  {
    id: "l-carnitine-l-tartrate",
    name: "L-Carnitine L-Tartrate",
    role: "Facilitates fatty acid transport into mitochondria for cellular energy production.",
    symbol: "LC",
    dosage: "500mg",
  },
  {
    id: "l-arginine",
    name: "L-Arginine",
    role: "A nitric oxide precursor that supports healthy blood flow and vascular performance.",
    symbol: "LA",
    dosage: "100mg",
  },
  {
    id: "magnesium",
    name: "Magnesium",
    role: "Essential mineral for electrolyte balance, muscle function, and neuromuscular recovery.",
    symbol: "Mg",
    dosage: "50mg",
  },
  {
    id: "vitamin-e",
    name: "Vitamin E (50%)",
    role: "Powerful antioxidant that protects cells from oxidative stress and free radical damage.",
    symbol: "VE",
    dosage: "9mg",
  },
  {
    id: "cyanocobalamin",
    name: "Cyanocobalamin (B12)",
    role: "Vital for red blood cell formation, neurological function, and DNA synthesis.",
    symbol: "B12",
    dosage: "2.4mcg",
  },
];
