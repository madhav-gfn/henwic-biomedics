export interface ProbioticStrain {
  id: string;
  name: string;
  benefit: string;
  colony: string;
}

export const FAUNAJOY_STRAINS: ProbioticStrain[] = [
  {
    id: "streptococcus-faecalis",
    name: "Streptococcus Faecalis",
    benefit: "Supports intestinal barrier integrity and nutrient uptake.",
    colony: "2.5B CFU",
  },
  {
    id: "clostridium-butyricum",
    name: "Clostridium Butyricum",
    benefit: "Produces butyrate for colonocyte nourishment.",
    colony: "1.8B CFU",
  },
  {
    id: "bacillus-mesentericus",
    name: "Bacillus Mesentericus",
    benefit: "Enzymatic digestion and microbial equilibrium.",
    colony: "2.0B CFU",
  },
  {
    id: "lactic-acid-bacillus",
    name: "Lactic Acid Bacillus",
    benefit: "Acidifies the gut environment against pathogens.",
    colony: "3.2B CFU",
  },
];
