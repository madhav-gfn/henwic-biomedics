export interface ProbioticStrain {
  id: string;
  name: string;
  benefit: string;
  colony: string;
}

export const FAUNAJOY_STRAINS: ProbioticStrain[] = [
  {
    id: "lactic-acid-bacillus",
    name: "Lactic Acid Bacillus",
    benefit: "Produces lactic acid to maintain optimal gut pH and inhibit harmful pathogens.",
    colony: "100 Million",
  },
  {
    id: "streptococcus-faecalis",
    name: "Streptococcus Faecalis",
    benefit: "Supports intestinal barrier integrity and enhances nutrient absorption.",
    colony: "60 Million",
  },
  {
    id: "clostridium-butyricum",
    name: "Clostridium Butyricum",
    benefit: "Produces butyrate to nourish colon cells and support digestive health.",
    colony: "4 Million",
  },
  {
    id: "bacillus-mesentericus",
    name: "Bacillus Mesentericus",
    benefit: "Aids enzymatic digestion and promotes healthy microbial balance in the gut.",
    colony: "2 Million",
  },
];
